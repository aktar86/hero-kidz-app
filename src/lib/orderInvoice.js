export const orderInvoiceTemplate = (order) => {
  const items = order.item
    .map(
      (p) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${p.title}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${p.quantity}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">৳${p.price}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">৳${(
          p.price * p.quantity
        ).toFixed(2)}</td>
      </tr>
    `,
    )
    .join("");

  const total = order.item.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">
    
    <h2 style="color:#333;">Hero Kidz - Order Invoice</h2>
    <p>Thank you for your order!</p>

    <p><b>Order Date:</b> ${order.createdAt}</p>

    <table style="width:100%;border-collapse:collapse;margin-top:20px;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:10px;border:1px solid #ddd;">Product</th>
          <th style="padding:10px;border:1px solid #ddd;">Qty</th>
          <th style="padding:10px;border:1px solid #ddd;">Price</th>
          <th style="padding:10px;border:1px solid #ddd;">Total</th>
        </tr>
      </thead>

      <tbody>
        ${items}
      </tbody>
    </table>

    <h3 style="text-align:right;margin-top:20px;">
      Grand Total: ৳${total.toFixed(2)}
    </h3>

    <p style="margin-top:30px;color:#666;">
      If you have any questions, reply to this email.
    </p>

  </div>
  `;
};
