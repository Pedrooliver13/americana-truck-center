// Packages
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Assets
import LogoImage from 'assets/americana-truck-center.png';

// Models
import { HygieneCertificate } from 'models/reports/reports';

export const generateHygieneCertificate = (data: HygieneCertificate) => {
  const doc = new jsPDF();
  doc.setTextColor(0, 0, 0);

  const logoWidth = 25;
  const logoHeight = 25;
  doc.addImage(LogoImage, 'PNG', 90, 2, logoWidth, logoHeight);

  doc.setFontSize(12);
  doc.text(`Id: ${String(data?.reportId)?.substring(0, 5)}`, 195, 20, {
    align: 'right',
  });

  autoTable(doc, {
    startY: 23,
    head: [
      [
        {
          content:
            'AV. LETICIA CIA BOÉR, 600 - VILA BERTINI - AMERICANA/SP\n' +
            'TELEFONE: (19) 3478-4615 / CNPJ: 37.541.303/0001-21 / E-MAIL: contato@americanatruckcenter.com.br\n' +
            'CÓDIGO DE REGISTRO IPEM: 012796/2022',
          colSpan: 5,
          styles: { halign: 'center', fontSize: 10 },
        },
      ],
    ],
    tableWidth: 182,
    columnStyles: {
      0: { cellWidth: 35 },
    },
  });

  // Parte de IDENTIFICAÇÃO
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [
      [
        {
          content: `DATA HIGIENIZAÇÃO: ${data?.hygieneCertificateDate || ''}`,
          styles: { fillColor: [0, 102, 204] },
        },
        {
          content: `REVISÃO: ${data?.reviewDate || ''}`,
          styles: { fillColor: [0, 102, 204], cellWidth: 90 },
        },
      ],
      [
        {
          content: 'IDENTIFICAÇÃO DO VEÍCULO',
          colSpan: 2,
          styles: { halign: 'center', fillColor: [255, 255, 0] },
        },
      ],
    ],
    headStyles: {
      fillColor: [0, 102, 204],
    },
    body: [
      [
        `RAZÃO SOCIAL: ${data?.socialName || ''}`,
        `CAVALO/TRUCK: ${data?.truck || ''}`,
      ],
      [
        `CARRETA/TANQUE: ${data?.tank || ''}`,
        `CAPACIDADE (M³): ${data?.capacity || ''}`,
      ],
      [`CONDUTOR: ${data.driverName || ''}`],
    ],
    styles: {
      textColor: [0, 0, 0],
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      cellPadding: 2,
    },
  });

  // Demais seções (loop para reaproveitar estrutura)
  const sections = [
    {
      title: 'PROCESSOS DE HIGIENIZAÇÃO',
      body: [
        ['ENXAGUE COM ÁGUA (30 MIN)', 'LAVAGEM COM ÁGUA QUENTE VAPOR (150°)'],
        ['SECAGEM COM PANO', 'USO DE DETERGENTE'],
        ['USO DE DETERGENTE', 'VENTILAÇÃO/EXAUSTÃO'],
      ],
    },
    {
      title: 'HISTÓRICO DE PRODUTOS TRANSPORTADOS',
      body: [
        ['ÚLTIMO', data?.lastProduct || ''],
        ['PENÚLTIMO', data?.pernultimateProduct || ''],
        ['ANTEPENÚLTIMO', data?.antepernultimateProduct || ''],
      ],
    },
    {
      title: 'LACRES',
      body: [
        ['BOCA DE VISITA', data?.visitMouth || ''],
        ['RESPIRO', data?.respiring || ''],
        ['VÁLVULA DE DESCARGA', data?.dischargeValve || ''],
        ['RELÓGIO DE PRESSÃO', data?.pressureWatch || ''],
        ['SUPORTE DO MANGOTE', data?.hoseHolder || ''],
        ['VÁLVULA DO DRENO', data?.drainValve || ''],
      ],
    },
    {
      title: 'AVALIAÇÃO - APÓS HIGIENIZAÇÃO',
      body: [
        ['CORPO ESTRANHO', data?.strangeBody || ''],
        ['SUJIDADE', data?.suitability || ''],
        ['PRESENÇA DE ÁGUA / LÍQUIDOS', data?.presenceOfLiquids || ''],
        ['ODORES', data?.odors || ''],
      ],
    },
    {
      title: 'INFORMAÇÕES ADICIONAIS',
      body: [
        ['EXECUÇÃO DA LAVAGEM', data?.washingExecution || ''],
        ['INSPECTOR’S CHOICE', data?.inspectorChoice || ''],
        ['DETERGENTE UTILIZADO', data?.detergentUsed || ''],
        ['TEMPERATURA ÁGUA (ENXAGUE)', data?.temperatureRinse || ''],
        ['TEMPERATURA ÁGUA (LAVAGEM)', data?.temperatureWashing || ''],
      ],
    },
  ];

  sections.forEach((section) => {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY,
      head: [
        [
          {
            content: section.title,
            colSpan: 2,
            styles: { halign: 'center', fillColor: [255, 255, 0] },
          },
        ],
      ],
      body: section.body,
      styles: {
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        cellPadding: 1,
      },
    });
  });

  // Rodapé e observações
  doc.setFontSize(8);
  doc.text(
    'Certifico para os devidos fins que o veículo foi submetido ao processo de higienização segundo os requisitos acima descritos. Que os colaboradores destinados para higienização e para inspeção da higienização das carretas atendem aos requisitos mínimos de higiene. Que as mangueiras utilizadas se encontram em boas condições (sem emendas, por exemplo) ponto que não há evidencias de resíduos do último produto transportado, apos o término do processo de higienização. Que todas as entradas e saída do caminhão são bem fechadas antes de ser levado há contratante. Que os tubos de armazenagem da mangueira são fechados com tampas nas duas extremidade e possue local para lacres. Acessáorios para carga e descarga, tais como, mangueiras, medidor de vazão e outros, foram contemplados no processo de higienização.',
    12,
    doc.lastAutoTable.finalY + 4,
    {
      maxWidth: 190,
    }
  );

  doc.setFontSize(10);
  doc.text(
    'PRAZO DE VALIDADE DO SERVIÇO DE DESCONTAMINAÇÃO: 48 HORAS',
    105,
    doc.lastAutoTable.finalY + 30,
    { align: 'center' }
  );

  // Assinaturas
  doc.setFontSize(9);
  doc.text(
    '_______________________________________',
    10,
    doc.lastAutoTable.finalY + 40
  );
  doc.text(
    'NOME LEGÍVEL DO RESPONSÁVEL PELA INSPEÇÃO\nKARINA FERNANDES TANGLI',
    10,
    doc.lastAutoTable.finalY + 45
  );
  doc.text(
    '_______________________________________',
    130,
    doc.lastAutoTable.finalY + 40
  );
  doc.text(
    `NOME LEGÍVEL DO CONDUTOR DO VEÍCULO\n ${data.driverName || ''}`,
    130,
    doc.lastAutoTable.finalY + 45
  );

  // Salvar
  doc.save('certificado_higienizacao.pdf');
};
