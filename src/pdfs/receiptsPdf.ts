// Packages
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Models
import { Task } from 'models/tasks/tasks';

// Assets
import LogoImage from 'assets/americana-truck-center.png';

export const generateReceiptsPDF = (data: Task) => {
  // Criar um novo documento PDF
  const doc = new jsPDF();

  // Definir as margens
  const marginLeft = 15;
  const marginTop = 10;

  // Adicionar a logo (assumindo que você tenha a logo como base64 ou como caminho)
  const logoWidth = 25;
  const logoHeight = 25;
  doc.addImage(LogoImage, 'PNG', marginLeft + 2, 5, logoWidth, logoHeight);

  const textOffset = marginTop + logoHeight - 10; // Posição Y logo abaixo da logo
  doc.setFontSize(8);
  doc.text('Av. Victório Pertile, 150', marginLeft + 1, textOffset + 5);
  doc.text('Vila Bertini, Americana - SP', marginLeft, textOffset + 10);

  // Alinhar o número do recibo e os números de telefone à direita
  const pageWidth = doc.internal.pageSize.getWidth();
  const phoneRightMargin = 15; // Distância da margem direita
  const phoneTextX = pageWidth - phoneRightMargin; // Posição X para o texto alinhado à direita

  // Número do recibo
  doc.setFontSize(12);
  doc.text(`Nº: ${data?.id}`, phoneTextX, marginTop + 5, { align: 'right' });

  // Telefones
  doc.setFontSize(10);
  doc.text('(19) 3478-4615', phoneTextX, marginTop + 10, { align: 'right' });
  doc.text('(19) 9 7120-1961', phoneTextX, marginTop + 15, {
    align: 'right',
  });
  doc.text('(19) 9 9363-9435', phoneTextX, marginTop + 20, {
    align: 'right',
  });

  // Linhas para dados do cliente, agora alinhados em duas colunas
  doc.setFontSize(10);
  const firstColumn = marginLeft;
  const secondColumn = 140; // Posição horizontal da segunda coluna
  const lineSpacing = 10; // Espaçamento vertical entre linhas

  doc.text(
    `CLIENTE: ${data?.name?.toUpperCase() ?? ''}`,
    firstColumn,
    marginTop + 45
  );
  doc.text(`DATA: ${data?.date ?? ''}`, secondColumn, marginTop + 45);
  doc.text('CAVALO: TESTE', firstColumn, marginTop + 45 + lineSpacing);
  doc.text('CARRETA: TESTE', secondColumn, marginTop + 45 + lineSpacing);
  doc.text(
    'OUTROS: ___________________________',
    firstColumn,
    marginTop + 45 + 2 * lineSpacing
  );
  doc.text(
    `PLACA: ${data?.vehicle ?? ''}`,
    secondColumn,
    marginTop + 45 + 2 * lineSpacing
  );

  // Variável para armazenar o último Y
  let finalY;

  const body = data?.services.length
    ? data?.services.map((service) => [service, '1x'])
    : [];

  autoTable(doc, {
    head: [['SERVIÇOS', 'QTD']],
    body,
    startY: marginTop + 35 + 3 * lineSpacing + 10, // Ajustar a posição de início da tabela
    didDrawCell: (data) => {
      finalY = data.cell.y + data.cell.height;
    },
    columnStyles: { 0: { cellWidth: 126 } },
    bodyStyles: { valign: 'top' },
    foot: [['TOTAL DE SERVIÇOS:', data?.services.length]],
  });

  if (finalY) {
    doc.text(
      'OBS: Não nos responsabilizamos por caminhões/veículos deixados na empresa após o horário de funcionamento,',
      marginLeft,
      finalY + 10
    );
    doc.text(
      'nem por objetos deixados no interior dos caminhões/veículos.',
      marginLeft,
      finalY + 15
    );
    doc.text(
      'Assinatura do Cliente: ___________________________',
      marginLeft,
      finalY + 40
    );
    doc.text(`${data?.registrationNumber ?? ''}`, 147, finalY + 39);
    doc.text(
      'Documento do Cliente: ___________________________',
      110,
      finalY + 40
    );
  }

  // Salvar o PDF
  doc.save(`${data?.name}-${data?.date}.pdf`);
};
