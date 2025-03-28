// Packages
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { toast } from 'react-toastify';

// Models
import { Task } from 'models/tasks/tasks';

// Assets
import LogoImage from 'assets/americana-truck-center.png';

// Utils
import { abbreviatesStrings, priceFormatter } from 'utils/formatter';

export const generateReceiptsPDF = (data: Task, isShowValue = false) => {
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
  doc.text(
    `Id: ${String(data?.id).substring(data?.id.length - 5)}`,
    phoneTextX,
    marginTop + 5,
    { align: 'right' }
  );

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
  const secondColumn = 125; // Posição horizontal da segunda coluna
  const lineSpacing = 10; // Espaçamento vertical entre linhas

  doc.text(
    `CLIENTE: ${
      data?.currentClient?.name?.toUpperCase() ?? '___________________________'
    }`,
    firstColumn,
    marginTop + 45
  );
  doc.text(
    `DATA: ${
      moment(data?.createdAt?.seconds * 1000).format('DD/MM/YYYY') ?? ''
    }`,
    secondColumn,
    marginTop + 45
  );
  doc.text(
    `VEÍCULO: ${data?.vehicle ?? '___________________________'}`,
    firstColumn,
    marginTop + 45 + lineSpacing
  );
  doc.text(
    `PLACA: ${data?.licensePlate ?? '_______________________'} `,
    secondColumn,
    marginTop + 45 + lineSpacing
  );
  doc.text(
    'OUTROS: ___________________________',
    firstColumn,
    marginTop + 45 + 2 * lineSpacing
  );
  doc.text(
    `FROTA: ${data?.fleet ?? '_______________________'} `,
    secondColumn,
    marginTop + 55 + lineSpacing
  );
  doc.text(
    `OBSERVAÇÃO: ${data?.observation ?? '_______________________'}`,
    firstColumn,
    marginTop + 55 + 2 * lineSpacing
  );

  // Variável para armazenar o último Y
  let finalY;

  const body = data?.services?.length
    ? data?.services.map((service) => [
        service?.name,
        isShowValue ? priceFormatter.format(Number(service.value)) : '1x',
      ])
    : [];

  autoTable(doc, {
    head: [['SERVIÇOS', isShowValue ? 'VALORES' : 'QTD']],
    body,
    startY: marginTop + 55 + 3 * lineSpacing + 10, // Ajustar a posição de início da tabela
    didDrawCell: (data) => {
      finalY = data.cell.y + data.cell.height;
    },
    columnStyles: { 0: { cellWidth: 120 } },
    bodyStyles: { valign: 'top' },
    foot: isShowValue
      ? [['TOTAL:', priceFormatter.format(Number(data.total))]]
      : [['TOTAL DE SERVIÇOS:', body?.length]],
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
      `${abbreviatesStrings(data?.name) ?? ''}`,
      marginLeft + 35,
      finalY + 39
    );
    doc.text(
      'Assinatura do Cliente: ___________________________',
      marginLeft,
      finalY + 40
    );
    doc.text(`${data?.driverDocument ?? ''}`, 147, finalY + 39);
    doc.text(
      'Documento do Cliente: _________________________',
      110,
      finalY + 40
    );
  }

  // Salvar o PDF
  doc.save(
    `${data?.name}-${moment(data?.createdAt?.seconds * 1000).format(
      'DD/MM/YYYY'
    )}.pdf`
  );
};

export const downloadReceiptsPDF = (data: Task, isShowValue: boolean) => {
  if (!data) {
    return toast.error('Não há dados para gerar o PDF.');
  }

  try {
    generateReceiptsPDF(data, isShowValue);
  } catch {
    toast.error('Erro ao gerar o PDF.');
  }
};
