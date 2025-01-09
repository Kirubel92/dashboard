const platformData = {
    'All Platforms': {
      followers: '245,678',
      engagement: '4.2%',
      posts: '1,234',
      reach: '15,432',
      engagementData: [4.2, 4.8, 4.1, 4.6, 4.9, 5.2],
      growthData: [1200, 800, 1500, 600]
    },
    'Facebook': {
      followers: '98,234',
      engagement: '3.8%',
      posts: '456',
      reach: '8,765',
      engagementData: [3.8, 4.1, 3.9, 4.2, 4.0, 4.3],
      growthData: [1200, 0, 0, 0]
    },
    'Twitter': {
      followers: '56,789',
      engagement: '4.5%',
      posts: '289',
      reach: '3,421',
      engagementData: [4.5, 4.7, 4.3, 4.8, 5.0, 4.9],
      growthData: [0, 800, 0, 0]
    },
    'Instagram': {
      followers: '67,890',
      engagement: '5.1%',
      posts: '345',
      reach: '9,876',
      engagementData: [5.1, 5.3, 4.9, 5.4, 5.6, 5.8],
      growthData: [0, 0, 1500, 0]
    },
    'LinkedIn': {
      followers: '22,765',
      engagement: '3.4%',
      posts: '144',
      reach: '2,345',
      engagementData: [3.4, 3.6, 3.2, 3.8, 3.9, 4.0],
      growthData: [0, 0, 0, 600]
    }
  };
  
  let engagementChart, growthChart;
  
  function updateDashboard(platform) {
    // Update stats
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = platformData[platform].followers;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = platformData[platform].engagement;
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = platformData[platform].posts;
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = platformData[platform].reach;
  
    // Update engagement chart
    if (engagementChart) {
      engagementChart.destroy();
    }
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    engagementChart = new Chart(engagementCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Engagement Rate',
          data: platformData[platform].engagementData,
          borderColor: '#4A90E2',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${platform} Engagement Rate Over Time` // Correctly using template literals
          }
        }
      }
    });
  
    // Update growth chart
    if (growthChart) {
      growthChart.destroy();
    }
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    growthChart = new Chart(growthCtx, {
      type: 'bar',
      data: {
        labels: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
        datasets: [{
          label: 'Follower Growth',
          data: platformData[platform].growthData,
          backgroundColor: [
            '#4267B2',
            '#1DA1F2',
            '#E1306C',
            '#0077B5'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${platform} Follower Growth by Platform` // Correctly using template literals
          }
        }
      }
    });
  }
  
  // Initialize charts with All Platforms data
  updateDashboard('All Platforms');
  
  // Platform button interactions
  document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDashboard(btn.textContent);
    });
  });
  