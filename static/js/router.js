
//const view = new View(templateLoader);

const router = {
	init: (function () {
		const appRouter = new Navigo(null, true);
		appRouter
			.on({
				'/home': () => {
					view.home('#content', {})
				},
				'*': () => {
					appRouter.navigate('/home');
				}
			})
			.notFound(function () {
				alert('Error! Router not found!');
			})
			.resolve();
	})()
}