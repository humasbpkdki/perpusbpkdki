// Form Data Keperluan Perpustakaan
const scriptURL = 'https://script.google.com/macros/s/AKfycbyV6MD2C3JazUQ4G5iat4DfPumCAiqXFNTw2zSl354xKtRmX0kiNYX6MZ0Wh6_48v1reg/exec';
const form = document.forms['form-data-keperluan-perpustakaan'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');
const alertBerhasil = document.getElementById('berhasil');
const alertDiisi = document.getElementById('diisi');
const popup = document.querySelector('.popup');

// Sembunyikan popup secara default
popup.style.display = 'none';

form.addEventListener('submit', e => {
   e.preventDefault();

   // Periksa apakah ada inputan yang belum diisi
   let isFormValid = true;

   const namaInput = form.querySelector('#nama');
   const instansiInput = form.querySelector('#instansi');
   const keperluanInput = form.querySelector('#keperluan');

   if (namaInput.value.trim() === '' || instansiInput.value.trim() === '' || keperluanInput.value.trim() ===
      '') {
      isFormValid = false;
   }

   if (isFormValid) {
      btnLoading.classList.toggle('d-none');
      btnKirim.classList.toggle('d-none');
      fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form),
         })
         .then(response => {
            btnLoading.classList.toggle('d-none');
            btnKirim.classList.toggle('d-none');
            form.reset();
            console.log('Success!', response);

            // Tampilkan alert berhasil dengan animasi
            alertBerhasil.style.display = 'block';
            setTimeout(() => {
               alertBerhasil.style.opacity = '1';
            }, 10);

            // Sembunyikan alert berhasil dengan animasi setelah 4 detik
            setTimeout(() => {
               alertBerhasil.style.opacity = '0';
               setTimeout(() => {
                  alertBerhasil.style.display = 'none';
               }, 500);
            }, 4000);

            // Tampilkan popup setelah 4 detik
            setTimeout(() => {
               // Hapus class "fade-out" jika ada
               popup.classList.remove('fade-out');
               popup.style.display = 'block';
               // Tandai bahwa popup telah ditampilkan
               localStorage.setItem('popupShown', 'true');
            }, 4000);
         })
         .catch(error => {
            console.error('Error!', error.message);
         });
   } else {
      // Tampilkan alert diisi dengan animasi jika ada inputan yang belum diisi
      alertDiisi.style.display = 'block';
      setTimeout(() => {
         alertDiisi.style.opacity = '1';
      }, 10);

      // Sembunyikan alert diisi dengan animasi setelah 4 detik
      setTimeout(() => {
         alertDiisi.style.opacity = '0';
         setTimeout(() => {
            alertDiisi.style.display = 'none';
         }, 500);
      }, 4000);
   }
});

// Popup
const closeIcon = document.querySelector('.bi-x-circle-fill');
closeIcon.addEventListener('click', (e) => {
   e.preventDefault();

   // Tambahkan class "fade-out" saat menutup popup
   popup.classList.add('fade-out');

   // Setelah animasi selesai, sembunyikan popup
   setTimeout(() => {
      popup.style.display = 'none';
   }, 300); // Sesuaikan dengan durasi animasi di CSS
});

const pilihSurveyLinks = document.querySelectorAll('.pilih-survey');

// Memulai dengan mengisi nilai-nilai dari penyimpanan lokal ke elemen-elemen <td>
for (const link of pilihSurveyLinks) {
   const targetId = link.getAttribute('data-for');
   const targetTd = document.getElementById(targetId);
   const nilaiDariStorage = localStorage.getItem(targetId);
   if (nilaiDariStorage !== null) {
      targetTd.innerText = nilaiDariStorage;
   }
}

const alertPopup = document.querySelector('.popup .alert');
alertPopup.style.display = 'none';

// Mendengarkan klik pada setiap elemen 'pilih-survey'
pilihSurveyLinks.forEach(link => {
   link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-for');
      const targetTd = document.getElementById(targetId);

      // Mengambil nilai saat ini dari penyimpanan lokal (localStorage)
      let nilaiSaatIni = parseInt(localStorage.getItem(targetId)) || 0;
      nilaiSaatIni += 1;
      localStorage.setItem(targetId, nilaiSaatIni.toString());
      targetTd.innerText = nilaiSaatIni;

      // Sembunyikan class pilihan dan class judul-survey
      const pilihan = document.querySelector('.pilihan');
      const judulSurvey = document.querySelector('.judul-survey');
      pilihan.style.display = 'none';
      judulSurvey.style.display = 'none';

      // Tampilkan class alert dalam class popup selama 3 detik
      alertPopup.style.display = 'block';
      setTimeout(() => {
         alertPopup.style.display = 'none';
         // Sembunyikan class popup setelah alert hilang
         popup.style.display = 'none';
         window.location.reload();
      }, 3000);
   });
});

// Total Voting
const sangatPuasTd = document.getElementById('sangatPuas');
const puasTd = document.getElementById('puas');
const cukupTd = document.getElementById('cukup');
const tidakPuasTd = document.getElementById('tidakPuas');

// Hitung total dari semua elemen tersebut
const total = parseInt(sangatPuasTd.textContent) + parseInt(puasTd.textContent) + parseInt(cukupTd.textContent) + parseInt(tidakPuasTd.textContent);

// Hitung persentase untuk setiap nilai dan bulatkan
const persenSangatPuas = Math.round((parseInt(sangatPuasTd.textContent) / total) * 100);
const persenPuas = Math.round((parseInt(puasTd.textContent) / total) * 100);
const persenCukup = Math.round((parseInt(cukupTd.textContent) / total) * 100);
const persenTidakPuas = Math.round((parseInt(tidakPuasTd.textContent) / total) * 100);

// Tampilkan hasil persentase dalam bilangan bulat di dalam kurung pada elemen-elemen tabel
sangatPuasTd.textContent = sangatPuasTd.textContent + ' Votes ' + '(' + persenSangatPuas + '%)';
puasTd.textContent = puasTd.textContent + ' Votes ' + '(' + persenPuas + '%)';
cukupTd.textContent = cukupTd.textContent + ' Votes ' + '(' + persenCukup + '%)';
tidakPuasTd.textContent = tidakPuasTd.textContent + ' Votes ' + '(' + persenTidakPuas + '%)';

// Tampilkan hasil jumlah di elemen dengan id "total"
const totalTd = document.getElementById('total');
totalTd.textContent = total.toString() + ' Votes ' + ' (100%)';