let keranjang = [];

// Scroll otomatis ke menu
document.getElementById("scrollToMenu").addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

// Tambah item ke keranjang
function addToCart(nama, harga) {
  keranjang.push({ nama, harga });
  renderKeranjang();
}

// Hapus item
function hapusPesanan(index) {
  keranjang.splice(index, 1);
  renderKeranjang();
}

// Tampilkan isi keranjang
function renderKeranjang() {
  const listKeranjang = document.getElementById("listKeranjang");
  listKeranjang.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index) => {
    total += item.harga;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}
      <button class="cancel-btn" onclick="hapusPesanan(${index})">X Batalkan</button>
    `;
    listKeranjang.appendChild(li);
  });

  document.getElementById(
    "totalHarga"
  ).textContent = `Total: Rp ${total.toLocaleString("id-ID")}`;
}

// Kirim pesanan via WhatsApp
document.getElementById("submit-btn").addEventListener("click", () => {
  const nama = document.getElementById("name").value.trim();
  const alamat = document.getElementById("address").value.trim();
  const wa = document.getElementById("whatsapp").value.trim();

  if (!nama || !alamat || !wa) {
    alert("❗ Mohon isi semua data pembeli terlebih dahulu!");
    return;
  }

  if (keranjang.length === 0) {
    alert("🛒 Keranjang masih kosong!");
    return;
  }

  // No WA
  const nomorToko = "6281214982445";

  let pesan = `Halo Bakmie Seafood 99! Saya ingin pesan:\n\n`;
  keranjang.forEach((item) => {
    pesan += `- ${item.nama} (Rp ${item.harga.toLocaleString("id-ID")})\n`;
  });

  pesan += `\nTotal: Rp ${keranjang
    .reduce((a, b) => a + b.harga, 0)
    .toLocaleString("id-ID")}`;
  pesan += `\n\nNama: ${nama}\nAlamat: ${alamat}\nNo. WA Pembeli: ${wa}`;

  // Format URL WhatsApp (nomor toko)
  const url = `https://wa.me/${nomorToko}?text=${encodeURIComponent(pesan)}`;

  // Buka WhatsApp
  window.open(url, "_blank");

  // Reset keranjang & form
  keranjang = [];
  renderKeranjang();
  document.getElementById("order-form").reset();
});

// Toggle menu mobile
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});
