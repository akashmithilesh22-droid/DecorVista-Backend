import PDFDocument from "pdfkit";

export const generatePDF = (session, res) => {
  const doc = new PDFDocument({ margin: 50, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=DecorVista-Quote.pdf"
  );

  doc.pipe(res);

  /* ========= COLORS ========= */
  const PRIMARY = "#C9A063";
  const TEXT = "#333333";

  /* ========= HEADER ========= */
  doc
    .fontSize(26)
    .fillColor(PRIMARY)
    .text("DecorVista", { align: "center" });

  doc
    .moveDown(0.5)
    .fontSize(12)
    .fillColor(TEXT)
    .text("Personalized Home Decor Quotation", { align: "center" });

  doc
    .moveDown()
    .strokeColor(PRIMARY)
    .lineWidth(2)
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  /* ========= CUSTOMER DETAILS ========= */
  doc.moveDown(1.5);

  doc.fontSize(11).fillColor(TEXT);
  doc.text(`Customer Name: ${session.name}`);
  doc.text(`Email: ${session.email}`);
  doc.text(`Room Type: ${session.roomType || "N/A"}`);
  doc.text(
    `Budget: ${session.budget ? `₹${session.budget.toLocaleString("en-IN")}` : "N/A"}`
  );

  /* ========= SELECTED FURNITURE ========= */
  doc.moveDown(1.5);

  doc.fontSize(16).fillColor(PRIMARY).text("Selected Furniture");

  doc.moveDown(0.5);
  doc.fontSize(11).fillColor(TEXT);

  // Table header
  const tableTop = doc.y;
  doc.text("Item", 50, tableTop);
  doc.text("Qty", 300, tableTop);
  doc.text("Unit Price", 350, tableTop);
  doc.text("Total", 450, tableTop);

  doc
    .moveTo(50, tableTop + 15)
    .lineTo(545, tableTop + 15)
    .strokeColor("#dddddd")
    .stroke();

  let y = tableTop + 25;
  let subtotal = 0;

  (session.selections || []).forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    doc.text(item.name, 50, y);
    doc.text(item.quantity.toString(), 300, y);
    doc.text(`₹${item.price.toLocaleString("en-IN")}`, 350, y);
    doc.text(`₹${itemTotal.toLocaleString("en-IN")}`, 450, y);

    y += 20;
  });

  /* ========= PRICE SUMMARY ========= */
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  doc.moveDown(2);
  doc.fontSize(16).fillColor(PRIMARY).text("Price Summary", 350);

  doc.moveDown(0.5);
  doc.fontSize(11).fillColor(TEXT);

  doc.text(`Subtotal: ₹${subtotal.toLocaleString("en-IN")}`, 350);
  doc.text(`GST (18%): ₹${gst.toLocaleString("en-IN")}`, 350);

  doc
    .fontSize(13)
    .fillColor(TEXT)
    .text(`Total Amount: ₹${total.toLocaleString("en-IN")}`, 350);

  /* ========= FOOTER ========= */
  doc
    .moveDown(3)
    .strokeColor("#dddddd")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  doc.moveDown(0.5);
  doc.fontSize(9).fillColor("#777777").text(
    "DecorVista • Personalized Home Decor Solutions\n📞 +91 22 1234 5678 • ✉ hello@decorvista.in",
    { align: "right" }
  );

  doc.end();
};
