// Юридическая сводка по юрлицу-оператору сервиса.
// Данные из Италии (Camera di Commercio di Verona). Пустые поля скрываются в UI.

export interface LegalInfo {
  company: string; // наименование
  form?: string; // правовая форма
  owner?: string; // владелец
  vat?: string; // VAT / Partita IVA
  fiscalCode?: string; // Codice Fiscale
  rea?: string; // номер REA
  regDate?: string; // дата регистрации
  address?: string; // юридический адрес
  email?: string; // контактный e-mail
  phone?: string; // телефон
}

export const LEGAL: LegalInfo = {
  company: 'TARGETPOINT AY',
  form: 'Ditta individuale · Sole proprietorship',
  owner: 'Yazeuski Aliaksei',
  vat: 'IT04986270231',
  fiscalCode: 'YZSLKS01E01Z139W',
  rea: 'REA VR-461511',
  regDate: '17.07.2023',
  address: 'Via Antonio Badile 57, 37131 Verona (VR), Italia',
  email: '',
  phone: '',
};

// Подписи полей для рендера в подвале.
export const LEGAL_FIELDS: { key: keyof LegalInfo; label: string }[] = [
  { key: 'company', label: 'Наименование' },
  { key: 'form', label: 'Форма' },
  { key: 'owner', label: 'Владелец' },
  { key: 'vat', label: 'VAT / P.IVA' },
  { key: 'fiscalCode', label: 'Codice Fiscale' },
  { key: 'rea', label: 'REA' },
  { key: 'regDate', label: 'Дата регистрации' },
  { key: 'address', label: 'Адрес' },
  { key: 'email', label: 'E-mail' },
  { key: 'phone', label: 'Телефон' },
];
