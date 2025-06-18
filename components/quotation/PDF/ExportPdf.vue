<script setup lang="ts">
const downloadPdf = async (quotationId: number) => {
  try {
    const response = await fetch(`/api/quotations/${quotationId}/pdf`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/pdf')) {
      // ✅ It’s a real PDF, proceed to download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `quotation_${quotationId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } else if (contentType.includes('application/json')) {
      // ❌ It’s an error in JSON format
      const errorData = await response.json();
      const text = JSON.stringify(errorData);
      throw new Error(text || 'Unknown error occurred.');
    } else {
      throw new Error('Unexpected response from server.');
    }

  } catch (err: any) {
    console.error('Download error:', err);
    alert(err.message || 'Failed to download PDF.');
  }
};
</script>

<template>
  <v-btn color="primary" @click="downloadPdf(432498326437)">
    Download PDF
  </v-btn>

  <template>
    <div>
      <v-btn @click="exportToPDF">📄 Exporteer als PDF</v-btn>

      <!-- Hidden printable content -->
      <div id="quotation-pdf" style="display: none">
        <h2>Offerte</h2>
        <p><strong>Klant:</strong> {{ quotation.customer.firstName }} {{ quotation.customer.lastName }}</p>
        <p><strong>Email:</strong> {{ quotation.customer.email }}</p>
        <p><strong>Telefoon:</strong> {{ quotation.customer.phoneNumber }}</p>
        <p><strong>Prijs:</strong> €{{ quotation.total }}</p>

        <h3>Producten:</h3>
        <ul>
          <li v-for="(product, index) in quotation.products" :key="index">
            {{ product.name }} - €{{ product.price }}
          </li>
        </ul>
      </div>
    </div>
  </template>
</template>
