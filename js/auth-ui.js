/**
 * 智慧农业 - 统一登录状态管理
 * 所有页面引入此脚本，自动处理导航栏的登录/用户显示
 */
(function () {
  const API_BASE = window.location.origin + '/api';

  function getToken() {
    return localStorage.getItem('chase_shop_token');
  }
  function getUser() {
    try {
      return JSON.parse(localStorage.getItem('chase_shop_user') || 'null');
    } catch (e) {
      return null;
    }
  }
  function isLoggedIn() {
    return !!getToken();
  }

  // 退出登录
  window.logout = function () {
    localStorage.removeItem('chase_shop_token');
    localStorage.removeItem('chase_shop_user');
    window.location.href = 'index.html';
  };

  // 更新导航栏
  function updateNavigation() {
    const nav = document.getElementById('navigation');
    if (!nav) return;

    const user = getUser();
    const currentPage = window.location.pathname.split('/').pop();

    // 需要登录才可访问的页面
    const protectedPages = ['user-center.html', 'orders.html'];

    if (isLoggedIn() && user) {
      // 已登录：显示用户名 + 退出
      const displayName = user.name || user.phone.slice(-4) + '用户';
      nav.innerHTML = `
        <li><a href="index.html">首页</a></li>
        <li><a href="shop.html">电商直销</a></li>
        <li><a href="user-center.html">👤 ${displayName}</a></li>
        <li><a class="nav-cta" href="javascript:logout()">退出</a></li>
      `;
    } else {
      // 未登录
      const loginHref = 'login.html?redirect=' + encodeURIComponent(currentPage);

      // 是否在需要登录的页面
      if (protectedPages.includes(currentPage)) {
        window.location.href = loginHref;
        return;
      }

      nav.innerHTML = `
        <li><a href="index.html">首页</a></li>
        <li><a href="shop.html">电商直销</a></li>
        <li><a class="nav-cta" href="${loginHref}">登录/注册</a></li>
      `;
    }
  }

  // 页面加载完成后更新导航
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavigation);
  } else {
    updateNavigation();
  }

  // 暴露给全局
  window.ChaseAuth = {
    getToken,
    getUser,
    isLoggedIn,
    logout: window.logout,
    updateNavigation,
  };
})();