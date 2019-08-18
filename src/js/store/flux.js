const getState = ({ getStore, setStore }) => {
	return {
		store: {
			books: [],
			session: {
				isLoggedIn: false,
				username: "user",
				password: "pass",
				token: ""
			},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			createBook: (author, title, yearPublished, category, description) => {
				const store = getStore();
				const endpoint =
					"https://8080-b126db93-61fd-461f-bd60-c39ef7e847a3.ws-us0.gitpod.io/wp-json/sample_api/v1/books/create";

				fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						accept: "application/json"
					},
					body: JSON.stringify({
						post_title: title,
						catogry: category,
						yearPublished: yearPublished,
						category: category,
						author: author,
						description: description
					})
				})
					.then(function(response) {
						return response.json();
					})
					.then(res => {
						fetch(
							"https://8080-b126db93-61fd-461f-bd60-c39ef7e847a3.ws-us0.gitpod.io/wp-json/sample_api/v1/books"
						)
							.then(response => {
								if (response.status !== 200) {
									alert("Connection error, status " + response.status);
									return;
								}
								response.json().then(data => {
									const store = getStore();
									store.products = data;
									setStore({ store });
								});
							})
							.catch(err => {
								alert("Fetch error: ", err);
							});
					})

					.catch(err => {
						alert("Fetch error: ", err);
					});
			},
			register: (user, pass, email) => {
				const endpoint =
					"https://8080-b126db93-61fd-461f-bd60-c39ef7e847a3.ws-us0.gitpod.io/wp-json/sample_api/v2/users/register";

				fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: user,
						password: pass,
						email: email
					})
				})
					.then(res => {
						if (res.status !== 200) {
							console.log("error " + res.status);
							return;
						}
						res.json().then(data => {
							let store = getStore();
							setStore({
								store
							});
						});
					})
					.catch(err => {
						alert("Fetch error: ", err);
					});
			},

			login: (user, pass) => {
				const endpoint =
					"https://8080-b126db93-61fd-461f-bd60-c39ef7e847a3.ws-us0.gitpod.io/wp-json/jwt-auth/v1/token";

				fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: user,
						password: pass
					})
				})
					.then(res => {
						if (res.status !== 200) {
							console.log("error" + res.status);
							return;
						}
						res.json().then(data => {
							let store = getStore();

							store.session = data;
							store.session.isLoggedIn = true;
							setStore({
								store
							});
						});
					})
					.catch(err => {
						alert("Fetch error: ", err);
					});
			},
			handleSignOut(e) {
				const store = getStore();
				e.preventDefault();
				store.session = {
					isLoggedIn: false,
					username: "user",
					password: "pass",
					token: ""
				};

				this.props.history.push("/login");
				setStore({ store: store });
			}
		}
	};
};

export default getState;
