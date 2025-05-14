<script setup lang="ts">
const downloadPdf = async (quotationId: number) => {
  try {
    const response = await fetch(`/api/quotations/${quotationId}/pdf`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

    const showprice = ref('');

// Fetch function to get the price
    const getFlatCommissionPrice = async () => {
      try {
        const response = await fetch(`/api/quotations/${quotationId}/flatcommision`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify(0) // sending the flat commission (0 in this case)
        });

        const data = await response.json();
        showprice.value = data.price; // Extract the price from the response
      } catch (error) {
        console.error(error);
        showprice.value = 'Error fetching price'; // Display an error if the fetch fails
      }
    };

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
    <p>Current price: {{ showprice.value }}</p>
  </v-btn>
</template>
