"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Edit, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";

export default function AdminStorageOptions() {
  const router = useRouter();
  const [storageOptions, setStorageOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    size_value: 0,
    price: "",
    premium_price: "",
    dimensions: "",
    features: "",
    use_case: "",
    is_popular: false,
    is_active: true,
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    fetchStorageOptions();
  }, []);

  const fetchStorageOptions = async () => {
    try {
      const response = await fetch("/api/admin/storage-options");
      const data = await response.json();
      setStorageOptions(data.storageOptions || []);
    } catch (error) {
      console.error("Error fetching storage options:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (option = null) => {
    if (option) {
      setEditingOption(option);
      setFormData({
        name: option.name || "",
        size: option.size || "",
        size_value: option.size_value || 0,
        price: option.price || "",
        premium_price: option.premium_price || "",
        dimensions: option.dimensions || "",
        features: Array.isArray(option.features) ? option.features.join("\n") : "",
        use_case: option.use_case || "",
        is_popular: option.is_popular || false,
        is_active: option.is_active !== false,
      });
    } else {
      setEditingOption(null);
      setFormData({
        name: "",
        size: "",
        size_value: 0,
        price: "",
        premium_price: "",
        dimensions: "",
        features: "",
        use_case: "",
        is_popular: false,
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOption(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const featuresArray = formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        ...formData,
        features: featuresArray,
        size_value: parseInt(formData.size_value) || 0,
      };

      if (editingOption) {
        payload.id = editingOption.id;
      }

      const method = editingOption ? "PUT" : "POST";
      const response = await fetch("/api/admin/storage-options", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save storage option");
      }

      toast({
        title: editingOption ? "Storage Option Updated" : "Storage Option Created",
        description: "Successfully saved storage option",
      });

      handleCloseModal();
      fetchStorageOptions();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this storage option?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/storage-options?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete storage option");
      }

      toast({
        title: "Storage Option Deleted",
        description: "Successfully deleted storage option",
      });

      fetchStorageOptions();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Storage Options</h1>
          <p className="text-muted-foreground">Manage warehouse storage options</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-primary to-accent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Storage Option
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storageOptions.map((option) => (
          <div
            key={option.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow relative"
          >
            {option.is_popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                POPULAR
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-1">{option.size}</h3>
              <p className="text-sm text-muted-foreground">{option.dimensions}</p>
              {option.use_case && (
                <p className="text-xs text-primary font-semibold mt-1">{option.use_case}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="text-sm text-muted-foreground">Base Price</div>
              <div className="text-2xl font-bold text-primary">{option.price}</div>
              {option.premium_price && (
                <div className="text-sm text-muted-foreground mt-1">
                  Premium: {option.premium_price}
                </div>
              )}
            </div>

            {option.features && Array.isArray(option.features) && (
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Features:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {option.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="truncate">• {feature}</li>
                  ))}
                  {option.features.length > 3 && (
                    <li className="text-primary">+{option.features.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                option.is_active
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}>
                {option.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleOpenModal(option)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(option.id)}
                variant="outline"
                size="sm"
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {storageOptions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No storage options found. Click "Add Storage Option" to create one.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingOption ? "Edit Storage Option" : "Add Storage Option"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-muted rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size *</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="500 SQ FT"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="size_value">Size Value (for sorting) *</Label>
                  <Input
                    id="size_value"
                    type="number"
                    value={formData.size_value}
                    onChange={(e) => setFormData({ ...formData, size_value: e.target.value })}
                    placeholder="500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Small Business Storage"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Base Price *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="AED 4,500/month"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="premium_price">Premium Price</Label>
                  <Input
                    id="premium_price"
                    value={formData.premium_price}
                    onChange={(e) => setFormData({ ...formData, premium_price: e.target.value })}
                    placeholder="AED 6,000/month"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dimensions">Dimensions/Description *</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="SME storage / light operations"
                  required
                />
              </div>

              <div>
                <Label htmlFor="use_case">Use Case</Label>
                <Input
                  id="use_case"
                  value={formData.use_case}
                  onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
                  placeholder="Contractors & E-commerce"
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="24/7 secure access&#10;Flexible lease terms&#10;Loading dock access"
                  className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                  rows={5}
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="is_popular"
                    checked={formData.is_popular}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_popular: checked })
                    }
                  />
                  <Label htmlFor="is_popular" className="cursor-pointer">
                    Mark as Popular
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_active: checked })
                    }
                  />
                  <Label htmlFor="is_active" className="cursor-pointer">
                    Active
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-primary to-accent"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingOption ? "Update" : "Create"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
