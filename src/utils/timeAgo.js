export const timeAgo = (timestamp) => {
	// Get the current timestamp in milliseconds
	const now = Date.now();
  
	// Calculate the difference between the current time and the given timestamp in seconds
	const secondsAgo = Math.floor((now - timestamp) / 1000);
  
	// Check for different time ranges and return a formatted string
  
	if (secondsAgo < 60) {
	  // Less than a minute ago
	  return `${secondsAgo}s ago`;
	} else if (secondsAgo < 3600) {
	  // Less than an hour ago
	  const minutesAgo = Math.floor(secondsAgo / 60);
	  return `${minutesAgo}m ago`;
	} else if (secondsAgo < 86400) {
	  // Less than a day ago
	  const hoursAgo = Math.floor(secondsAgo / 3600);
	  return `${hoursAgo}h ago`;
	} else if (secondsAgo < 604800) {
	  // Less than a week ago
	  const daysAgo = Math.floor(secondsAgo / 86400);
	  return `${daysAgo}d ago`;
	} else {
	  // A week or more ago
	  const weeksAgo = Math.floor(secondsAgo / 604800);
	  return `${weeksAgo}w ago`;
	}
  };
  