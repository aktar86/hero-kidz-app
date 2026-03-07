export const orderInvoiceTemplate = ({ orderId, items, totalPrice }) => {
  const productRows = items
    .map((item) => {
      return `
        <tr>
          <td>${item.title}</td>
          <td align="center">${item.quantity}</td>
          <td align="center">৳${item.price}</td>
          <td align="center">৳${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family: Arial; padding:20px;">
      <h2>🧾 Order Invoice</h2>

      <p>Order ID: <strong>${orderId}</strong></p>

      <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse:collapse;">
        <thead>
          <tr>
            <th align="left">Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          ${productRows}
        </tbody>
      </table>

      <h3 style="text-align:right;margin-top:20px;">
        Grand Total: ৳${totalPrice}
      </h3>

      <p style="margin-top:30px;color:#777;">
        Thank you for your order ❤️
      </p>
    </div>
  `;
};
