"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Download, ArrowLeft, Calendar, Package, Mail, Phone, MapPin, CreditCard, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InvoiceDisplay = ({ paymentData, bookingData, bookingId }) => {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  // Force Locomotive Scroll to update when invoice loads
  useEffect(() => {
    const updateScroll = () => {
      if (window.locomotive) {
        setTimeout(() => {
          window.locomotive.update();
        }, 100);
      }
    };
    updateScroll();
  }, []);

  const handleDownloadInvoice = async () => {
    setDownloading(true);

    try {
      // Dynamic import to reduce bundle size
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const invoiceElement = document.getElementById('invoice-content');

      if (!invoiceElement) {
        throw new Error('Invoice element not found');
      }

      // Hide download button temporarily
      const downloadSection = document.getElementById('download-section');
      if (downloadSection) {
        downloadSection.style.display = 'none';
      }

      // Generate canvas from invoice
      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Show download button again
      if (downloadSection) {
        downloadSection.style.display = 'flex';
      }

      // Create PDF
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download PDF
      const invoiceNumber = bookingId?.slice(0, 8).toUpperCase() || 'INVOICE';
      pdf.save(`Vaulta-Invoice-${invoiceNumber}.pdf`);

      toast({
        title: "Invoice Downloaded!",
        description: "Your invoice has been saved as PDF.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download invoice. Please try printing instead.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-background animated-gradient py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your warehouse space has been successfully reserved.
            </p>
          </div>

          {/* Invoice Card */}
          <div id="invoice-content" className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
            {/* Invoice Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-8 text-white print:bg-primary">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
                  <p className="text-white/80">Vaulta Storage</p>
                  <p className="text-sm text-white/70">72 6B Street, Al Quoz, Dubai, UAE</p>
                  <p className="text-sm text-white/70">+971 4 258 5754</p>
                  <p className="text-sm text-white/70">info@vaultastorage.com</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/70">Invoice Number</div>
                  <div className="font-mono font-bold text-lg">
                    #{bookingId?.slice(0, 8).toUpperCase()}
                  </div>
                  <div className="text-sm text-white/70 mt-2">Date</div>
                  <div className="text-sm">{invoiceDate}</div>
                </div>
              </div>
            </div>

            {/* Invoice Content */}
            <div className="p-8">
              {/* Bill To */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-muted-foreground mb-3">BILL TO</h3>
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{bookingData.name}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.email}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.phone}</p>
                  {bookingData.address && (
                    <p className="text-sm text-muted-foreground">{bookingData.address}</p>
                  )}
                </div>
              </div>

              {/* Invoice Details Table */}
              <div className="border border-border rounded-lg overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold">Description</th>
                      <th className="text-right p-4 text-sm font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-4">
                        <div className="font-semibold">{bookingData.size} Storage Unit</div>
                        <div className="text-sm text-muted-foreground">{bookingData.dimensions}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Move-in Date: {bookingData.moveInDate}
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold">
                        AED {parseInt(bookingData.totalPrice).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="border-t border-border bg-muted/30">
                    <tr>
                      <td className="p-4 text-right font-bold text-lg">Total Paid</td>
                      <td className="p-4 text-right">
                        <div className="text-2xl font-bold text-primary">
                          AED {parseInt(bookingData.totalPrice).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-semibold capitalize">
                        {paymentData?.payment_method?.replace('_', ' ') || 'Card Payment'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                      <p className="font-mono text-xs font-semibold break-all">
                        {paymentData?.transaction_id || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                      <p className="font-semibold text-primary capitalize">
                        {paymentData?.status || 'Completed'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Booking Status</p>
                      <p className="font-semibold text-primary capitalize">
                        {paymentData?.bookings?.status || 'Confirmed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Confirmation Email</p>
                      <p className="text-xs text-muted-foreground">
                        You'll receive a detailed booking confirmation via email within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Welcome Call</p>
                      <p className="text-xs text-muted-foreground">
                        Our team will contact you to schedule a facility tour and answer any questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Move-In Preparation</p>
                      <p className="text-xs text-muted-foreground">
                        We'll prepare your unit and provide access details before your move-in date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-muted/20 rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold mb-4">Need Assistance?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Call us</p>
                      <a href="tel:+97142585754" className="text-sm font-semibold hover:text-primary transition-colors">
                        +971 4 258 5754
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Email us</p>
                      <a href="mailto:info@vaultastorage.com" className="text-sm font-semibold hover:text-primary transition-colors">
                        info@vaultastorage.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Visit us</p>
                      <p className="text-sm font-semibold">72 6B Street, Al Quoz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  Thank you for choosing Vaulta Storage. This invoice serves as confirmation of your payment and booking.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div id="download-section" className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="gap-2"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" /> Download as PDF
                </>
              )}
            </Button>
            <Button
              size="lg"
              onClick={() => router.push('/')}
              className="gap-2 bg-gradient-to-r from-primary to-accent"
            >
              <ArrowLeft className="w-5 h-5" /> Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDisplay;
