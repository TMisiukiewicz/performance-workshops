export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});
  const month = date.toLocaleDateString('en-US', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();

  let relativeText = '';
  if (diffDays === 0) {
    relativeText = 'today';
  } else if (diffDays === 1) {
    relativeText = 'yesterday';
  } else if (diffDays < 7) {
    relativeText = `${diffDays} days ago`;
  } else if (diffDays < 30) {
    relativeText = `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays < 365) {
    relativeText = `${Math.floor(diffDays / 30)} months ago`;
  } else {
    relativeText = `${Math.floor(diffDays / 365)} years ago`;
  }

  return `${dayOfWeek}, ${month} ${day}, ${year} (${relativeText})`;
};
