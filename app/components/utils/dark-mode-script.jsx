export default function DarkModeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
(function() {
  try {
	var root = document.documentElement;
	var stored = localStorage.getItem('theme'); // 'dark' | 'light' | 'system' | null
	var mq = window.matchMedia('(prefers-color-scheme: dark)');

	function applyTheme() {
	  var prefersDark = mq.matches;
	  var shouldDark =
		stored === 'dark' ? true :
		stored === 'light' ? false :
		prefersDark;

	  root.classList.toggle('dark', shouldDark);
	}

	// Initial run
	applyTheme();

	// Listen for system theme changes
	mq.addEventListener('change', applyTheme);
  } catch (_) {}
})();
		`,
			}}
		/>
	);
}
