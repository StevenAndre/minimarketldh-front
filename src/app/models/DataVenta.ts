export interface PartyIdentification {
    "cbc:ID": {
        "_attributes": {
            "schemeID": string;
        };
        "_text": string;
    };
}

export interface PartyLegalEntity {
    "cbc:RegistrationName": {
        "_text": string;
    };
    "cac:RegistrationAddress": {
        "cac:AddressLine"?: {
            "cbc:Line": {
                "_text": string;
            };
        };
        "cbc:AddressTypeCode"?: {
            "_text": string;
        };
    };
}

export interface Party {
    "cac:PartyIdentification": PartyIdentification;
    "cac:PartyLegalEntity": PartyLegalEntity;
}

export interface AccountingParty {
    "cac:Party": Party;
}

export interface TaxSubtotal {
    "cbc:TaxableAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
    "cbc:TaxAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
    "cac:TaxCategory": {
        "cbc:Percent"?: {
            "_text": number;
        };
        "cbc:TaxExemptionReasonCode"?: {
            "_text": string;
        };
        "cac:TaxScheme": {
            "cbc:ID": {
                "_text": string;
            };
            "cbc:Name": {
                "_text": string;
            };
            "cbc:TaxTypeCode": {
                "_text": string;
            };
        };
    };
}

export interface TaxTotal {
    "cbc:TaxAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
    "cac:TaxSubtotal": TaxSubtotal[];
}

export interface LegalMonetaryTotal {
    "cbc:LineExtensionAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
    "cbc:TaxInclusiveAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
    "cbc:PayableAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
}

export interface InvoiceLine {
    "cbc:ID": {
        "_text": number;
    };
    "cbc:InvoicedQuantity": {
        "_attributes": {
            "unitCode": string;
        };
        "_text": number;
    };
    "cbc:LineExtensionAmount": {
        "_attributes": {
            "currencyID": string;
        };
        "_text": number;
    };
    "cac:PricingReference": {
        "cac:AlternativeConditionPrice": {
            "cbc:PriceAmount": {
                "_attributes": {
                    "currencyID": string;
                };
                "_text": number;
            };
            "cbc:PriceTypeCode": {
                "_text": string;
            };
        };
    };
    "cac:TaxTotal": TaxTotal;
    "cac:Item": {
        "cbc:Description": {
            "_text": string;
        };
    };
    "cac:Price": {
        "cbc:PriceAmount": {
            "_attributes": {
                "currencyID": string;
            };
            "_text": number;
        };
    };
}

export interface DocumentBody {
    "cbc:UBLVersionID": {
        "_text": string;
    };
    "cbc:CustomizationID": {
        "_text": string;
    };
    "cbc:ID": {
        "_text": string;
    };
    "cbc:IssueDate": {
        "_text": string;
    };
    "cbc:IssueTime": {
        "_text": string;
    };
    "cbc:DueDate"?: {
        "_text": string;
    };
    "cbc:InvoiceTypeCode": {
        "_attributes": {
            "listID": string;
        };
        "_text": string;
    };
    "cbc:Note": {
        "_text": string;
        "_attributes": {
            "languageLocaleID": string;
        };
    }[];
    "cbc:DocumentCurrencyCode": {
        "_text": string;
    };
    "cac:AccountingSupplierParty": AccountingParty;
    "cac:AccountingCustomerParty": AccountingParty;
    "cac:TaxTotal": TaxTotal;
    "cac:LegalMonetaryTotal": LegalMonetaryTotal;
    "cac:PaymentTerms"?: {
        "cbc:ID": {
            "_text": string;
        };
        "cbc:PaymentMeansID": {
            "_text": string;
        };
    }[];
    "cac:InvoiceLine": InvoiceLine[];
}

export interface Invoice {
    personaId: string;
    personaToken: string;
    fileName: string;
    documentBody: DocumentBody;
}
// Factura (InvoiceTypeCode: "01")
// export const factura: Invoice = {
//     personaId: "6670c2bab98c560015b1bae5",
//     personaToken: "DEV_0JPbuTvNtCJDPliltLdhOqNuB8TD1DZnJAHrRbvptigBXXQtZht5XIN3sjKH5WAC", // Debes asignar tu personaToken aquí
//     fileName: "10111213141-03-B001-{lastnumber}", // Debes asignar el nombre del archivo aquí
//     documentBody: {
//         UBLVersionID: {
//             text: "2.1"
//         },
//         CustomizationID: {
//             text: "2.0"
//         },
//         ID: {
//             text: "" // Debes asignar el ID de la factura aquí
//         },
//         IssueDate: {
//             text: "" // Debes asignar la fecha de emisión aquí
//         },
//         IssueTime: {
//             text: "" // Debes asignar la hora de emisión aquí
//         },
//         DueDate: {
//             text: "" // Debes asignar la fecha de vencimiento aquí
//         },
//         InvoiceTypeCode: {
//             listID: "0101",
//             text: "01"
//         },
//         Note: [
//             {
//                 text: "", // Debes asignar el texto de la nota aquí
//                 languageLocaleID: "1000"
//             }
//         ],
//         DocumentCurrencyCode: {
//             text: "PEN"
//         },
//         AccountingSupplierParty: {
//             Party: {
//                 PartyIdentification: {
//                     schemeID: "6",
//                     text: "10111213141"
//                 },
//                 PartyLegalEntity: {
//                     RegistrationName: "Minimarket Los dos hermanitos",
//                     RegistrationAddress: {
//                         AddressTypeCode: "0000"
//                     }
//                 }
//             }
//         },
//         AccountingCustomerParty: {
//             Party: {
//                 PartyIdentification: {
//                     schemeID: "6",
//                     text: "" // Debes asignar el ID del cliente aquí
//                 },
//                 PartyLegalEntity: {
//                     RegistrationName: "", // Debes asignar el nombre del cliente aquí
//                     RegistrationAddress: {
//                         AddressLine: {
//                             Line: "" // Debes asignar la dirección del cliente aquí
//                         }
//                     }
//                 }
//             }
//         },
//         TaxTotal: {
//             TaxAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto del impuesto aquí
//             },
//             TaxSubtotal: [
//                 {
//                     TaxableAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el monto imponible aquí
//                     },
//                     TaxAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el monto del impuesto aquí
//                     },
//                     TaxCategory: {
//                         TaxScheme: {
//                             ID: "1000",
//                             Name: "IGV",
//                             TaxTypeCode: "VAT"
//                         }
//                     }
//                 }
//             ]
//         },
//         LegalMonetaryTotal: {
//             LineExtensionAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto de la línea aquí
//             },
//             TaxInclusiveAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto con impuestos aquí
//             },
//             PayableAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto a pagar aquí
//             }
//         },
//         PaymentTerms: [
//             {
//                 ID: {
//                     text: "FormaPago"
//                 },
//                 PaymentMeansID: {
//                     text: "Contado"
//                 }
//             }
//         ],
//         InvoiceLine: [
//             {
//                 ID: 1,
//                 InvoicedQuantity: {
//                     unitCode: "NIU",
//                     text: 0 // Debes asignar la cantidad facturada aquí
//                 },
//                 LineExtensionAmount: {
//                     currencyID: "PEN",
//                     text: 0 // Debes asignar el monto de la línea aquí
//                 },
//                 PricingReference: {
//                     AlternativeConditionPrice: {
//                         PriceAmount: {
//                             currencyID: "PEN",
//                             text: 0 // Debes asignar el precio aquí
//                         },
//                         PriceTypeCode: "01"
//                     }
//                 },
//                 TaxTotal: {
//                     TaxAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el monto del impuesto aquí
//                     },
//                     TaxSubtotal: [
//                         {
//                             TaxableAmount: {
//                                 currencyID: "PEN",
//                                 text: 0 // Debes asignar el monto imponible aquí
//                             },
//                             TaxAmount: {
//                                 currencyID: "PEN",
//                                 text: 0 // Debes asignar el monto del impuesto aquí
//                             },
//                             TaxCategory: {
//                                 Percent: 18,
//                                 TaxExemptionReasonCode: "10",
//                                 TaxScheme: {
//                                     ID: "1000",
//                                     Name: "IGV",
//                                     TaxTypeCode: "VAT"
//                                 }
//                             }
//                         }
//                     ]
//                 },
//                 Item: {
//                     Description: "" // Debes asignar la descripción del producto aquí
//                 },
//                 Price: {
//                     PriceAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el precio aquí
//                     }
//                 }
//             }
//         ]
//     }
// };

// // Boleta (InvoiceTypeCode: "03")
// export const boleta: Invoice = {
//     personaId: "6670c2bab98c560015b1bae5",
//     personaToken: "DEV_0JPbuTvNtCJDPliltLdhOqNuB8TD1DZnJAHrRbvptigBXXQtZht5XIN3sjKH5WAC", // Debes asignar tu personaToken aquí
//     fileName: "", // Debes asignar el nombre del archivo aquí
//     documentBody: {
//         UBLVersionID: {
//             text: "2.1"
//         },
//         CustomizationID: {
//             text: "2.0"
//         },
//         ID: {
//             text: "" // Debes asignar el ID de la boleta aquí
//         },
//         IssueDate: {
//             text: "" // Debes asignar la fecha de emisión aquí
//         },
//         IssueTime: {
//             text: "" // Debes asignar la hora de emisión aquí
//         },
//         InvoiceTypeCode: {
//             listID: "0101",
//             text: "03"
//         },
//         Note: [
//             {
//                 text: "", // Debes asignar el texto de la nota aquí
//                 languageLocaleID: "1000"
//             }
//         ],
//         DocumentCurrencyCode: {
//             text: "PEN"
//         },
//         AccountingSupplierParty: {
//             Party: {
//                 PartyIdentification: {
//                     schemeID: "6",
//                     text: "10111213141"
//                 },
//                 PartyLegalEntity: {
//                     RegistrationName: "Minimarket Los dos hermanitos",
//                     RegistrationAddress: {
//                         AddressTypeCode: "0000"
//                     }
//                 }
//             }
//         },
//         AccountingCustomerParty: {
//             Party: {
//                 PartyIdentification: {
//                     schemeID: "1",
//                     text: "" // Debes asignar el ID del cliente aquí
//                 },
//                 PartyLegalEntity: {
//                     RegistrationName: "", // Debes asignar el nombre del cliente aquí
//                     RegistrationAddress: {
//                         AddressLine: {
//                             Line: "" // Debes asignar la dirección del cliente aquí
//                         }
//                     }
//                 }
//             }
//         },
//         TaxTotal: {
//             TaxAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto del impuesto aquí
//             },
//             TaxSubtotal: [
//                 {
//                     TaxableAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el monto imponible aquí
//                     },
//                     TaxAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el monto del impuesto aquí
//                     },
//                     TaxCategory: {
//                         TaxScheme: {
//                             ID: "1000",
//                             Name: "IGV",
//                             TaxTypeCode: "VAT"
//                         }
//                     }
//                 }
//             ]
//         },
//         LegalMonetaryTotal: {
//             LineExtensionAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto de la línea aquí
//             },
//             TaxInclusiveAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto con impuestos aquí
//             },
//             PayableAmount: {
//                 currencyID: "PEN",
//                 text: 0 // Debes asignar el monto a pagar aquí
//             }
//         },
//         InvoiceLine: [
//             {
//                 ID: 1,
//                 InvoicedQuantity: {
//                     unitCode: "NIU",
//                     text: 0 // Debes asignar la cantidad facturada aquí
//                 },
//                 LineExtensionAmount: {
//                     currencyID: "PEN",
//                     text: 0 // Debes asignar el monto de la línea aquí
//                 },
//                 PricingReference: {
//                     AlternativeConditionPrice: {
//                         PriceAmount: {
//                             currencyID: "PEN",
//                             text: 0 // Debes asignar el precio aquí
//                         },
//                         PriceTypeCode: "01"
//                     }
//                 },
//                 TaxTotal: {
//                     TaxAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el monto del impuesto aquí
//                     },
//                     TaxSubtotal: [
//                         {
//                             TaxableAmount: {
//                                 currencyID: "PEN",
//                                 text: 0 // Debes asignar el monto imponible aquí
//                             },
//                             TaxAmount: {
//                                 currencyID: "PEN",
//                                 text: 0 // Debes asignar el monto del impuesto aquí
//                             },
//                             TaxCategory: {
//                                 Percent: 18,
//                                 TaxExemptionReasonCode: "10",
//                                 TaxScheme: {
//                                     ID: "1000",
//                                     Name: "IGV",
//                                     TaxTypeCode: "VAT"
//                                 }
//                             }
//                         }
//                     ]
//                 },
//                 Item: {
//                     Description: "" // Debes asignar la descripción del producto aquí
//                 },
//                 Price: {
//                     PriceAmount: {
//                         currencyID: "PEN",
//                         text: 0 // Debes asignar el precio aquí
//                     }
//                 }
//             }
//         ]
//     }
// };