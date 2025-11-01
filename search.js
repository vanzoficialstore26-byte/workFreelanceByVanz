const freelancers = [
  { name: "Andi Pratama", skills: "UI/UX, Figma, Adobe XD", img: "https://via.placeholder.com/300x160/4f46e5/ffffff?text=Andi" },
  { name: "Budi Santoso", skills: "Web Dev, React, Node.js", img: "https://via.placeholder.com/300x160/7c3aed/ffffff?text=Budi" },
  { name: "Citra Dewi", skills: "Graphic Design, Illustrator", img: "https://via.placeholder.com/300x160/10b981/ffffff?text=Citra" },
  { name: "Dedi Kurnia", skills: "Mobile Dev, Flutter", img: "https://via.placeholder.com/300x160/f59e0b/ffffff?text=Dedi" },
  { name: "Eka Putri", skills: "Content Writer, SEO", img: "https://via.placeholder.com/300x160/ef4444/ffffff?text=Eka" },
  { name: "Fajar Ramadhan", skills: "DevOps, AWS, Docker", img: "https://via.placeholder.com/300x160/0ea5e9/ffffff?text=Fajar" }
];

const listEl = document.getElementById('freelancerList');
const searchInput = document.getElementById('searchInput');

function renderFreelancers(list) {
  listEl.innerHTML = '';
  list.forEach(f => {
    const card = `
      <div class="freelancer-card">
        <img src="${f.img}" alt="${f.name}">
        <div class="card-body">
          <h3>${f.name}</h3>
          <div class="skills">${f.skills}</div>
          <a href="#" class="btn-hire" onclick="showNotification('Fitur pesan belum aktif (demo).', 'info'); return false;">Hubungi</a>
        </div>
      </div>
    `;
    listEl.innerHTML += card;
  });
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = freelancers.filter(f =>
    f.name.toLowerCase().includes(term) ||
    f.skills.toLowerCase().includes(term)
  );
  renderFreelancers(filtered);
});

// Render semua saat pertama kali
renderFreelancers(freelancers);

// Gunakan fungsi notifikasi dari auth.js (kita pindahkan ke notify.js terpisah)
// Tapi agar simpel, kita load ulang fungsinya di sini jika belum ada
if (typeof showNotification !== 'function') {
  function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; top: 20px; right: 20px; padding: 12px 20px;
      border-radius: 8px; color: white; font-weight: 500; z-index: 10000;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: fadeInOut 3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2700);
    const style = document.createElement('style');
    style.textContent = @keyframes fadeInOut {0%{opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{opacity:0}};
    document.head.appendChild(style);
  }
}