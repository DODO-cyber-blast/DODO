const fetchBtn = document.getElementById('fetch-btn');
const urlInput = document.getElementById('url-input');
const timeDisplay = document.getElementById('time-display');

let timeInterval = null;

fetchBtn.addEventListener('click', () => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    let url = urlInput.value.trim();
    if (!url) {
        timeDisplay.textContent = 'URL을 입력하세요.';
        return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        urlInput.value = url;
    }

    fetchServerTime(url);
});

async function fetchServerTime(url) {
    timeDisplay.textContent = '가져오는중...';
    try {
        // Use the self-hosted Cloudflare Worker as a proxy
        const proxyUrl = `/proxy?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl, {
            method: 'HEAD',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const serverDate = response.headers.get('Date');
        console.log('Server Date:', serverDate);

        if (!serverDate) {
            timeDisplay.textContent = '서버에서 날짜 정보를 제공하지 않습니다.';
            return;
        }

        let time = new Date(serverDate);

        timeDisplay.textContent = time.toLocaleTimeString('ko-KR');

        timeInterval = setInterval(() => {
            time = new Date(time.getTime() + 1000);
            timeDisplay.textContent = time.toLocaleTimeString('ko-KR');
        }, 1000);

    } catch (error) {
        console.error('Error fetching server time:', error);
        timeDisplay.textContent = '시간을 가져올 수 없습니다. URL을 확인하거나 다른 주소를 시도해 보세요.';
    }
}
