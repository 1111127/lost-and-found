// 示例数据
const items = [
    {
        id: 1,
        type: 'found',
        title: '校园卡',
        description: '在图书馆三楼捡到的校园卡',
        location: '图书馆',
        time: '2024-03-20',
        image: 'https://img.freepik.com/free-vector/id-card-template_23-2147823795.jpg'
    },
    {
        id: 2,
        type: 'lost',
        title: '黑色手提包',
        description: '在教学楼丢失的黑色手提包',
        location: '教学楼',
        time: '2024-03-21',
        image: 'https://img.freepik.com/free-photo/black-leather-handbag_1203-8313.jpg'
    }
];

// 感谢墙数据
const thanksStories = [
    {
        id: 1,
        story: '感谢在图书馆捡到我校园卡的同学，让我免去了补办的麻烦！',
        author: '张同学',
        date: '2024-03-20'
    },
    {
        id: 2,
        story: '非常感谢帮我找到钱包的好心人，校园里还有这么多温暖的人！',
        author: '李同学',
        date: '2024-03-19'
    }
];

// 添加图片加载错误处理
function handleImageError(img) {
    img.onerror = null; // 防止循环调用
    img.src = 'https://via.placeholder.com/300x200?text=图片未找到';
}

// 修改渲染函数
function renderItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = items.map(item => `
        <div class="item-card">
            <img src="${item.image}" 
                 class="item-image" 
                 alt="${item.title}"
                 onerror="handleImageError(this)">
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                <p><i class="far fa-clock"></i> ${item.time}</p>
            </div>
        </div>
    `).join('');
}

// 搜索功能
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
    );
    renderItems(filteredItems);
});

// 分类筛选
document.getElementById('categorySelect').addEventListener('change', (e) => {
    const category = e.target.value;
    const filteredItems = category ? 
        items.filter(item => item.type === category) : 
        items;
    renderItems(filteredItems);
});

// 发布弹窗
const postModal = document.getElementById('postModal');
const postBtn = document.getElementById('postBtn');
const closeBtn = document.querySelector('.close');

postBtn.onclick = () => postModal.style.display = 'block';
closeBtn.onclick = () => postModal.style.display = 'none';

// 点击弹窗外部关闭
window.onclick = (e) => {
    if (e.target === postModal) {
        postModal.style.display = 'none';
    }
}

// 切换显示内容
document.getElementById('wallBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const itemsContainer = document.getElementById('itemsContainer');
    const thanksWall = document.getElementById('thanksWall');
    const searchSection = document.querySelector('.search-section');
    
    if (thanksWall.style.display === 'none') {
        itemsContainer.style.display = 'none';
        searchSection.style.display = 'none';
        thanksWall.style.display = 'block';
        renderThanksWall();
    } else {
        itemsContainer.style.display = 'grid';
        searchSection.style.display = 'flex';
        thanksWall.style.display = 'none';
    }
});

// 渲染感谢墙
function renderThanksWall() {
    const container = document.getElementById('thanksContainer');
    container.innerHTML = thanksStories.map(story => `
        <div class="thanks-card">
            <p>${story.story}</p>
            <div class="thanks-info">
                <span>${story.author}</span>
                <span>${story.date}</span>
            </div>
        </div>
    `).join('');
}

// 处理发布表单提交
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
        id: items.length + 1,
        type: formData.get('type'),
        title: formData.get('title'),
        description: formData.get('description'),
        location: formData.get('location'),
        time: new Date().toISOString().split('T')[0],
        image: await handleImageUpload(formData.get('image'))
    };
    
    items.unshift(newItem);
    renderItems(items);
    postModal.style.display = 'none';
    e.target.reset();
});

// 处理图片上传
async function handleImageUpload(file) {
    if (!file) return '';
    // 这里应该添加实际的图片上传逻辑
    // 返回图片URL
    return URL.createObjectURL(file);
}

// 初始化渲染
renderItems(items); 