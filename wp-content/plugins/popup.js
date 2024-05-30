setTimeout(function() {
  document.getElementById('popup').style.display = 'block';
  
  document.getElementById('subscribeBtn').addEventListener('click', function() {
    window.location.href = 'https://www.youtube.com/@tecnikofficial'; // Redirect to TecnikOfficial's YouTube channel
  });
  
  document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
  });
}, 10000); // 10000 milliseconds = 10 seconds
