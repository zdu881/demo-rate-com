/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // 侧边栏切换
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // 如果存在本地存储设置，恢复侧边栏的状态
    if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      document.body.classList.toggle("sb-sidenav-toggled");
    }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }

  // 标签点击事件
  const tagBadges = document.querySelectorAll(".badge");
  tagBadges.forEach((badge) => {
    if (
      !badge.classList.contains("bg-danger") &&
      !badge.classList.contains("bg-success") &&
      !badge.classList.contains("bg-warning") &&
      !badge.classList.contains("bg-primary")
    ) {
      badge.addEventListener("click", function (event) {
        if (badge.closest(".d-flex.flex-wrap.gap-2")) {
          // 在标签筛选区域被点击
          console.log("标签被选择:", badge.textContent.trim());
          // 可以在这里添加标签筛选的逻辑
        }
      });
    }
  });

  // 帖子相关功能
  const postBadges = document.querySelectorAll(".post-badge");
  postBadges.forEach((badge) => {
    badge.addEventListener("click", function (event) {
      if (badge.closest(".post-container")) {
        // 在帖子区域被点击
        console.log("帖子被选择:", badge.textContent.trim());
        // 可以在这里添加帖子相关的逻辑
      }
    });
  });
  
  // 帖子搜索功能
  const searchForm = document.querySelector('.navbar form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = this.querySelector('input[type="text"]');
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm !== '') {
        // 简单的搜索逻辑，这里可以根据实际需求进行修改
        // 例如，跳转到搜索结果页面或在当前页面显示搜索结果
        console.log('搜索内容:', searchTerm);
        alert('正在搜索: ' + searchTerm);
        // 实际项目中可能会使用以下代码
        // window.location.href = 'search-results.html?q=' + encodeURIComponent(searchTerm);
      }
    });
    
    // 搜索按钮点击事件
    const searchButton = document.getElementById('btnNavbarSearch');
    if (searchButton) {
      searchButton.addEventListener('click', function() {
        searchForm.dispatchEvent(new Event('submit'));
      });
    }
  }

  // 帖子列表点击事件
  const postList = document.querySelector('.table.table-hover');
  if (postList) {
    postList.addEventListener('click', function(e) {
      // 查找最近的帖子链接
      const postLink = e.target.closest('a');
      if (postLink && postLink.getAttribute('href') === '#') {
        e.preventDefault();
        // 假设我们有一个帖子详情页，并传递一个示例的帖子ID
        window.location.href = 'post-detail.html?id=1';
      }
    });
  }
  
  // 帖子过滤功能
  const filterSelect = document.querySelector('select[aria-label="标签筛选"]');
  if (filterSelect) {
    filterSelect.addEventListener('change', function() {
      const selectedTag = this.value;
      console.log('筛选标签:', selectedTag);
      
      // 在实际项目中，这里可能会根据选择的标签过滤帖子列表
      // 简单模拟一下过滤效果
      if (selectedTag === '所有标签' || selectedTag === null) {
        document.querySelectorAll('.table.table-hover tbody tr').forEach(tr => {
          tr.style.display = '';
        });
      } else {
        document.querySelectorAll('.table.table-hover tbody tr').forEach(tr => {
          // 假设我们能通过一些方式获取每行对应的标签
          // 这里仅作为示例进行演示
          const tagSpans = tr.querySelectorAll('.badge');
          let hasMatchingTag = false;
          
          tagSpans.forEach(span => {
            if (span.textContent.includes(selectedTag)) {
              hasMatchingTag = true;
            }
          });
          
          tr.style.display = hasMatchingTag ? '' : 'none';
        });
      }
    });
  }
  
  // 回到顶部按钮
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'btn btn-primary btn-sm position-fixed';
  backToTopBtn.style.bottom = '20px';
  backToTopBtn.style.right = '20px';
  backToTopBtn.style.display = 'none';
  backToTopBtn.style.zIndex = '1000';
  backToTopBtn.title = '回到顶部';
  document.body.appendChild(backToTopBtn);
  
  // 监听滚动事件，显示或隐藏回到顶部按钮
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  // 点击回到顶部按钮，滚动到页面顶部
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 帖子点赞功能
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 获取当前点赞数
      const likeCount = parseInt(this.getAttribute('data-likes') || '0');
      const postId = this.getAttribute('data-post-id');
      
      // 检查用户是否已经点赞过（可以使用本地存储记录）
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      
      if (likedPosts[postId]) {
        // 已点赞，取消点赞
        likedPosts[postId] = false;
        this.innerHTML = `<i class="far fa-thumbs-up"></i> ${likeCount - 1}`;
        this.setAttribute('data-likes', likeCount - 1);
        this.classList.remove('liked');
      } else {
        // 未点赞，添加点赞
        likedPosts[postId] = true;
        this.innerHTML = `<i class="fas fa-thumbs-up"></i> ${likeCount + 1}`;
        this.setAttribute('data-likes', likeCount + 1);
        this.classList.add('liked');
      }
      
      // 更新本地存储
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      
      // 实际项目中，这里还需要发送请求到后端更新点赞数据
      console.log(`帖子 ${postId} 的点赞状态已更新`);
    });
  });
  
  // 帖子收藏功能
  const favoriteButtons = document.querySelectorAll('.favorite-button');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const postId = this.getAttribute('data-post-id');
      const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts') || '{}');
      
      if (favoritePosts[postId]) {
        // 已收藏，取消收藏
        favoritePosts[postId] = false;
        this.innerHTML = '<i class="far fa-star"></i>';
        this.title = '收藏';
        this.classList.remove('favorited');
      } else {
        // 未收藏，添加收藏
        favoritePosts[postId] = true;
        this.innerHTML = '<i class="fas fa-star"></i>';
        this.title = '取消收藏';
        this.classList.add('favorited');
      }
      
      // 更新本地存储
      localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
      
      // 实际项目中，这里还需要发送请求到后端更新收藏数据
      console.log(`帖子 ${postId} 的收藏状态已更新`);
    });
  });
  
  // 初始化图表
  const initCharts = () => {
    // 活跃度图表
    const activityChart = document.getElementById('activityChart');
    if(activityChart) {
      new Chart(activityChart, {
        type: 'line',
        data: {
          labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          datasets: [{
            label: "每日活跃度",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: [86, 114, 106, 106, 107, 135, 148],
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
    
    // 标签热度分布图
    const postsChart = document.getElementById('postsChart');
    if(postsChart) {
      new Chart(postsChart, {
        type: 'bar',
        data: {
          labels: ["校园生活", "学术交流", "社团活动", "就业创业", "美食", "考试"],
          datasets: [{
            label: "帖子数量",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: [124, 156, 78, 92, 134, 189],
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  
  // 如果页面中有Chart.js，初始化图表
  if(typeof Chart !== 'undefined') {
    initCharts();
  }
});
