import dayjs from "dayjs";
import { Image } from "react-native";

import BenefitType from "@app/src/common/enums/benefitType.enum";
import IBenefit from "@app/src/common/interfaces/benefit.interface";
import getAgeByBirthday from "@app/src/utils/getAgeByBirthday";
import sunLifeLogoBase64 from "./images/sunlifeLogo.base64";

// TODO: Refactor
interface TemplateValues {
  generationDate: Date;
  name: string;
  birthday: string;
  smokingHabit: string;
  productName: string;
  productDescription: string;
  benefits: IBenefit[];
  annualPayment: number;
  semiAnnualPayment: number;
  quarterlyPayment: number;
  monthlyPayment: number;
  additionalComment: string;
}

const generatedQuoteHtmlTemplate = async ({
  generationDate,
  name,
  birthday,
  smokingHabit,
  productName,
  productDescription,
  benefits,
  annualPayment,
  semiAnnualPayment,
  quarterlyPayment,
  monthlyPayment,
  additionalComment,
}: TemplateValues) => {
  const formatter = Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  const primaryBenefitsTableHtml = `<p>Primary</p>
  <table>
    ${benefits
      .filter((i) => i.type === BenefitType.PRIMARY)
      .map((i) => {
        let value;
        if (i.amount) {
          value = i.amount
            ? `${formatter.format(parseInt(i.value || "0"))}`
            : i.value;
        } else {
          value = i.value;
        }
        return `
        <tr>
          <td>${i.name}</td>
          <td>${value}</td>
        </tr>`;
      })}
  </table>`;

  const suppBenefitsTableHtml = `<p>Supplementary</p>
  <table>
    ${benefits
      .filter((i) => i.type === BenefitType.SUPPLEMENTARY)
      .map((i) => {
        let value;

        if (i.amount) {
          value = i.amount
            ? `${formatter.format(parseInt(i.value || "0"))}`
            : i.value;
        } else {
          value = i.value;
        }
        return `
        <tr>
          <td>${i.name}</td>
          <td>${value}</td>
        </tr>`;
      })}
  </table>`;

  const age = getAgeByBirthday(birthday);

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-family: "Verdana";
      }
      #bond-paper {
        max-width: 816px;
        background-color: white;
        margin: auto;
      }

      #sunlife-logo {
        display: block;
        margin: 15px auto;
        max-width: 220px;
      }

      #divider {
        height: 2px;
        background-color: #c3c3c3;
      }
      table {
        width: 100%;
      }

      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }

      td {
        padding: 8px;
        width: 50%;
      }

      #prepared-by {
        text-align: right;
      }

      #prepared-by p {
        margin-bottom: -10px;
      }
    </style>
  </head>
  <body>
    <div id="bond-paper">
      <img id="sunlife-logo" src="${sunLifeLogoBase64}" />
      <div id="divider"></div>
      <p style="text-align: right; font-weight: bold">${dayjs(
        generationDate
      ).format("MMMM D, YYYY")}</p>
      <h3>Insurance Proposal Quotation For:</h3>
      <p>${name}, ${age} Years Old, ${smokingHabit}</p>
      <div style="height: 10px"></div>
      <p>Dear ${name},</p>
      <p>
        Thank you for the opportunity to assist you in choosing your personal
        insurance needs. Please find below the follow insurance benefits.
      </p>
      <div style="height: 10px"></div>
      <p>Product Name: ${productName}</p>
      <p style="color: #5c5c5c">${productDescription}</p>
      <div style="height: 10px"></div>

      <p>BENEFITS:</p>
      ${primaryBenefitsTableHtml}
      ${suppBenefitsTableHtml}
      
      <p>PREMIUM</p>
      <p style="font-size: 14px"><i> your payment options:</i></p>
      <table>
        <tr>
          <td>Annual</td>
          <td>${formatter.format(annualPayment)}</td>
        </tr>
        <tr>
          <td>Semi-Annual</td>
          <td>${formatter.format(semiAnnualPayment)}</td>
        </tr>
        <tr>
          <td>Quarterly</td>
          <td>${formatter.format(quarterlyPayment)}</td>
        </tr>
        <tr>
          <td>Monthly</td>
          <td>${formatter.format(monthlyPayment)}</td>
        </tr>
      </table>
      <p style="font-size: 14px"><i> your payment options:</i></p>

      <p>Additional Comment:</p>
      <p>${additionalComment}</p>
      <div style="height: 15px"></div>

      <div id="prepared-by">
        <p>PREPARED BY</p>
        <p>Joy Pangilinan</p>
        <p>Sun Life Licensed Financial Advisor</p>
        <p>#09978715533</p>
        <p>joy.l.pangilinan@sunlife.com.ph</p>
      </div>
    </div>
  </body>
</html>
  `;
};

export default generatedQuoteHtmlTemplate;
