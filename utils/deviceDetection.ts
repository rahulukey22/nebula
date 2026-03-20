export interface DeviceInfo {
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  browserName: string;
  browserVersion: string;
  os: string;
}

export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;
  
  // Detect device type
  let deviceType: 'Mobile' | 'Tablet' | 'Desktop' = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    deviceType = 'Mobile';
  }
  
  // Detect browser
  let browserName = 'Unknown';
  let browserVersion = '';
  
  if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    const match = ua.match(/Firefox\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.indexOf('SamsungBrowser') > -1) {
    browserName = 'Samsung Browser';
    const match = ua.match(/SamsungBrowser\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    browserName = 'Opera';
    const match = ua.match(/(Opera|OPR)\/(\d+\.\d+)/);
    browserVersion = match ? match[2] : '';
  } else if (ua.indexOf('Trident') > -1) {
    browserName = 'Internet Explorer';
    const match = ua.match(/rv:(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) {
    browserName = 'Edge';
    const match = ua.match(/(Edge|Edg)\/(\d+\.\d+)/);
    browserVersion = match ? match[2] : '';
  } else if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
    const match = ua.match(/Version\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  }
  
  // Detect OS
  let os = 'Unknown';
  if (ua.indexOf('Win') > -1) {
    os = 'Windows';
    if (ua.indexOf('Windows NT 10.0') > -1) os = 'Windows 10';
    else if (ua.indexOf('Windows NT 6.3') > -1) os = 'Windows 8.1';
    else if (ua.indexOf('Windows NT 6.2') > -1) os = 'Windows 8';
    else if (ua.indexOf('Windows NT 6.1') > -1) os = 'Windows 7';
  } else if (ua.indexOf('Mac') > -1) {
    os = 'macOS';
  } else if (ua.indexOf('X11') > -1 || ua.indexOf('Linux') > -1) {
    os = 'Linux';
  } else if (ua.indexOf('Android') > -1) {
    os = 'Android';
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    if (match) os = `Android ${match[1]}`;
  } else if (ua.indexOf('like Mac') > -1) {
    os = 'iOS';
    const match = ua.match(/OS (\d+_\d+(_\d+)?)/);
    if (match) os = `iOS ${match[1].replace(/_/g, '.')}`;
  }
  
  return {
    deviceType,
    browserName,
    browserVersion,
    os
  };
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create persistent IDs from localStorage
export function getPersistentSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  
  const stored = localStorage.getItem('zudio_session_id');
  if (stored) return stored;
  
  const newId = generateSessionId();
  localStorage.setItem('zudio_session_id', newId);
  return newId;
}

export function getPersistentUserId(): string {
  if (typeof window === 'undefined') return generateUserId();
  
  const stored = localStorage.getItem('zudio_user_id');
  if (stored) return stored;
  
  const newId = generateUserId();
  localStorage.setItem('zudio_user_id', newId);
  return newId;
}

// Clear session ID (for new sessions)
export function clearSessionId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('zudio_session_id');
  }
}
