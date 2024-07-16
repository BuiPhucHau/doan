// bill-pdf.service.ts
import { Injectable } from '@angular/core';
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { IBill } from '../../models/ibill.model';
import fs from 'fs';


@Injectable({
  providedIn: 'root'
})
export class BillPdfService {

  constructor() { }

  async createPDF(bBill: IBill): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Add logo
    const imagePath = '../../../../../assets/image/logo.png'; // Adjust path as necessary
    const imageBytes = await fetch(imagePath).then(response => response.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(imageBytes);
    const imageWidth = 200;
    const imageHeight = 200;
    page.drawImage(logoImage, {
      x: width / 2 - imageWidth / 2,
      y: height - fontSize * 2 - imageHeight,
      width: imageWidth,
      height: imageHeight,
    });

    // Add restaurant name
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const restaurantName = 'CurstGourmet Ressaurant'; // Adjust the restaurant name as needed
    const restaurantNameFontSize = 18; // Adjust the font size as needed
    const restaurantNameWidth = timesRomanFont.widthOfTextAtSize(restaurantName, restaurantNameFontSize);

    page.drawText(restaurantName, {
      x: width / 2 - restaurantNameWidth / 2,
      y: height - fontSize * 2 - imageHeight - fontSize * 2,
      size: restaurantNameFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    let yPosition = height - fontSize * 2 - imageHeight - fontSize * 2 - fontSize * 2;

    // Add Bill Details
    page.drawText(`Bill ID: ${bBill.BillId}`, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;
    page.drawText(`Order ID: ${bBill.OrderId}`, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;
    page.drawText(`Table ID: ${bBill.TableId}`, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;
    page.drawText(`Total Quantity: ${bBill.QuantityTotal}`, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;
    page.drawText(`Total Amount: ${bBill.Total}`, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;
    page.drawText(`Date Payment: ${new Date(bBill.DatePayment).toLocaleString()}`, { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;

    // Add Dish List
    page.drawText('Dish List:', { x: 50, y: yPosition, size: fontSize, font: timesRomanFont });
    yPosition -= fontSize * 2;

    bBill.dishList.forEach((dish: any) => {
      page.drawText(`- ${dish.nameDish}: ${dish.quantity} x ${dish.price}`, { x: 60, y: yPosition, size: fontSize, font: timesRomanFont });
      yPosition -= fontSize * 2;
    });

    // Save PDF and return bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }
}
