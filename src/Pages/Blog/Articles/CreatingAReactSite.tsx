import React from "react";

const articleTitle: string = "How to create a react website from scratch";

export default function CreatingAReactSite(): JSX.Element {
	document.title = articleTitle;

	return (
		<div>
			<div className="mb-5">
				<h1>{articleTitle}</h1>
				<h5 className="text-secondary">
					By: Austin Bray - Upload Date: July 29, 2022
				</h5>
				<p>
					React.js is a popular modern frontend javascript framework, and there
					is a large market for apps which use it. Thus in this article we will
					show you how to create your first website using it.
				</p>
				<img src="/mern.jpeg" className="largeImg" />
			</div>
			<div className="mb-5">
				<h3>Step 1: Download Node.js</h3>
				<img src="/Blog/CreatingAReactSite/nodejs.jpeg" className="largeImg" />
				<p>
					React.js runs with the support of Node.js and is installed through the
					node package manager, thus to download React.js you must first
					download and install Node.js from{" "}
					<a href="https://nodejs.org/en/download/">nodejs.org</a>. There are
					versions for most versions of windows, mac, and linux, so make sure to
					download the correct version for your os. After running the installer,
					you can type node --version in the command prompt or terminal in order
					to check that the install has worked.
				</p>
				<img
					src="/Blog/CreatingAReactSite/node-version.png"
					className="smallImg"
				/>
			</div>
			<div className="mb-5">
				<h3>Step 2: Run the creation command</h3>
				<p>
					Once node is installed, a react app can be created through the node
					package manager (npm). To do this, open the command prompt or terminal
					and change to the directory of where you want to create your app. Then
					run this command: npx create-react-app my-app.
					<img
						src="/Blog/CreatingAReactSite/creation.png"
						className="smallImg"
					/>
					You may be asked to install create-react-app in which case just enter
					Y for yes. This will create a folder called my-app and install the
					neccesary dependancies to get started with react. Note: my-app can be
					changed to what ever you want to call your app but it is good practice
					to have the name be all lower case and with hyphens seperating the
					words.
				</p>
			</div>
			<div className="mb-5">
				<h3>Step 3: Ecosystem Overview</h3>
				<p>
					Now that your app is created, you can open it in an ide or code editor
					such as vscode.
					<img src="/Blog/CreatingAReactSite/files.png" className="smallImg" />
					Here we will two folders, src and public, src will contain any react
					components you create and React components can not import files
					outside of this folder, except for installed packages. In the public
					folder you put any of your resource files, such as images, videos, or
					the website icon. When using the src tag on an element is will
					automatically start in this folder. Your entry file to react is
					located in the src folder and is called index.js.
					<img
						src="/Blog/CreatingAReactSite/indexjs.png"
						className="smallImg"
					/>
					With this info you should be able to begin developing your very first
					react website!
				</p>
			</div>
			<div className="mb-5">
				<h3>
					Thank you for reading! - Help keep education free by donating to our
					paypal, information on the <a href="/contact">contact</a> page.
				</h3>
			</div>
		</div>
	);
}
