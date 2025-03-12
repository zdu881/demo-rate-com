window.addEventListener("DOMContentLoaded", (event) => {
  // 简单数据表格
  const datatablesSimple = document.getElementById("datatablesSimple");
  if (datatablesSimple) {
    new simpleDatatables.DataTable(datatablesSimple);
  }

  // 帖子表格增强功能
  const postTable = document.querySelector(".table.table-hover");
  if (postTable) {
    // 添加表格排序功能
    const sortableHeaders = postTable.querySelectorAll(
      'th[data-sortable="true"]'
    );
    sortableHeaders.forEach((header) => {
      header.style.cursor = "pointer";
      header.addEventListener("click", function () {
        const sortDirection =
          this.getAttribute("data-sort-direction") === "asc" ? "desc" : "asc";
        this.setAttribute("data-sort-direction", sortDirection);

        // 获取排序列的索引
        const headerIndex = Array.from(this.parentNode.children).indexOf(this);

        // 排序表格行
        const tbody = postTable.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((a, b) => {
          const aValue = a.children[headerIndex].textContent.trim();
          const bValue = b.children[headerIndex].textContent.trim();

          if (sortDirection === "asc") {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });

        // 重新添加排序后的行
        rows.forEach((row) => tbody.appendChild(row));

        // 更新所有排序指示器
        sortableHeaders.forEach((h) => {
          h.querySelector(".sort-indicator")?.remove();
        });

        // 添加排序指示器
        const indicator = document.createElement("span");
        indicator.className = "sort-indicator ms-1";
        indicator.innerHTML =
          sortDirection === "asc"
            ? '<i class="fas fa-sort-up"></i>'
            : '<i class="fas fa-sort-down"></i>';
        this.appendChild(indicator);
      });
    });
  }

  // 可过滤的帖子列表
  const setupFilterable = () => {
    const filterInput = document.getElementById("postFilter");
    if (filterInput && postTable) {
      filterInput.addEventListener("input", function () {
        const filterText = this.value.toLowerCase();
        const rows = postTable.querySelectorAll("tbody tr");

        rows.forEach((row) => {
          const titleCell = row.querySelector("td:nth-child(2)");
          if (titleCell) {
            const title = titleCell.textContent.toLowerCase();
            const tags = Array.from(titleCell.querySelectorAll(".badge"))
              .map((badge) => badge.textContent.toLowerCase())
              .join(" ");

            const authorCell = row.querySelector("td:nth-child(3)");
            const author = authorCell
              ? authorCell.textContent.toLowerCase()
              : "";

            // 如果标题、标签或作者包含过滤文本，则显示行
            if (
              title.includes(filterText) ||
              tags.includes(filterText) ||
              author.includes(filterText)
            ) {
              row.style.display = "";
            } else {
              row.style.display = "none";
            }
          }
        });
      });
    }
  };

  setupFilterable();

  // 活跃度图表配置
  const activityChartConfig = {
    type: "line",
    data: {
      labels: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      datasets: [
        {
          label: "发帖量",
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
          data: [
            10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849,
            24159, 32651, 31984,
          ],
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            min: 0,
            max: 40000,
            maxTicksLimit: 5,
          },
          grid: {
            color: "rgba(0, 0, 0, .125)",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  // 标签热度图表配置
  const postsChartConfig = {
    type: "bar",
    data: {
      labels: ["校园生活", "学术交流", "社团活动", "就业创业", "美食", "考试"],
      datasets: [
        {
          label: "帖子数量",
          backgroundColor: [
            "rgba(13, 110, 253, 0.8)",
            "rgba(108, 117, 125, 0.8)",
            "rgba(25, 135, 84, 0.8)",
            "rgba(220, 53, 69, 0.8)",
            "rgba(255, 193, 7, 0.8)",
            "rgba(13, 202, 240, 0.8)",
          ],
          borderColor: [
            "rgb(13, 110, 253)",
            "rgb(108, 117, 125)",
            "rgb(25, 135, 84)",
            "rgb(220, 53, 69)",
            "rgb(255, 193, 7)",
            "rgb(13, 202, 240)",
          ],
          borderWidth: 1,
          data: [4215, 5312, 6251, 7841, 9821, 14984],
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            min: 0,
            max: 15000,
            maxTicksLimit: 5,
          },
          grid: {
            color: "rgba(0, 0, 0, .125)",
          },
        },
      },
    },
  };

  // 初始化图表
  const activityChart = document.getElementById("activityChart");
  const postsChart = document.getElementById("postsChart");

  if (activityChart) {
    new Chart(activityChart, activityChartConfig);
  }

  if (postsChart) {
    new Chart(postsChart, postsChartConfig);
  }
});
