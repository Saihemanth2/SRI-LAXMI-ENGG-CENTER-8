document.getElementById('invoiceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const customerName = document.getElementById('customerName').value;
    const itemName = document.getElementById('itemName').value;
    const qty = parseFloat(document.getElementById('qty').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const discount = parseFloat(document.getElementById('discount').value);

    // Calculate total with discount
    const total = (qty * amount) * (1 - discount / 100);

    // Display invoice details
    document.getElementById('invoiceTotal').innerText = `Total: $${total.toFixed(2)}`;
    document.getElementById('invoiceDetails').style.display = 'block';

    // Enable download button
    document.getElementById('downloadExcel').addEventListener('click', function() {
        generateExcel(customerName, itemName, qty, amount, discount, total);
    });
});

function generateExcel(customerName, itemName, qty, amount, discount, total) {
    const invoiceData = [
        ['Customer Name', 'Item Name', 'Quantity', 'Amount', 'Discount (%)', 'Total'],
        [customerName, itemName, qty, amount, discount, total]
    ];

    const ws = XLSX.utils.aoa_to_sheet(invoiceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoice');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoice.xlsx';
    link.click();
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
