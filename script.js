// Basic interactive behaviors for prototype
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.navlink').forEach(function(a){
    a.addEventListener('click',function(e){
      // smooth scroll
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // demo notifications
  const notes = document.getElementById('notes');
  if(notes){
    const li = document.createElement('li');
    li.textContent = 'Reminder: Review pending leaves';
    notes.appendChild(li);
  }

  // add employee demo
  document.getElementById('addEmp').addEventListener('click',function(){
    alert('Add Employee form would open (prototype).');
  });

});
