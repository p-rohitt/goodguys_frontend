import jsPDF from 'jspdf';

export default function downloadPDF(filename, content) {
  const doc = new jsPDF();
  doc.text(content, 10, 10);
  
  // Save the PDF file
  doc.save(filename);
}


