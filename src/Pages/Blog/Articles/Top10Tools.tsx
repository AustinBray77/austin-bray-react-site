import React from "react";

const articleTitle = "Top Tools for Developers in 2022";

export default function Top10Tools(): JSX.Element {
	document.title = articleTitle;

	return (
		<div>
			<div className="mb-5">
				<h1>{articleTitle}</h1>
				<h5 className="text-secondary">
					By: Austin Bray - Upload Date: August 10, 2022
				</h5>
				<p>
					There are a variety of different tools and programs available to
					developers, but which ones are actually worth your time? This article
					will give you programs that I personally use while programming and I
					think you should definetly consider using.
				</p>
			</div>
			<div className="mb-5">
				<h3>#1 - Visual Studio Code</h3>
				<img src="/Blog/TopToolsForDevs2022/vsc.png" className="largeimg" />
				<p>
					Visual Studio Code is currently the most versatile IDE available with
					its market of extensions and barebones nature. This allows it to have
					support for developing in every major programming language with out
					lengthy installs, while still providing users with a minimal and easy
					to use interface. This is why I believe that VSCode is the best IDE
					currently available. To use VSCode go to{" "}
					<a href="https://code.visualstudio.com/download">
						code.visualstudio.com/download
					</a>{" "}
					and select the version for your operating system.
				</p>
			</div>
			<div className="mb-5">
				<h3>#2 - Git</h3>
				<img
					src="/Blog/TopToolsForDevs2022/Git-Icon.png"
					className="largeimg"
				/>
				<p>
					Git is the premium source control software available today, allowing
					you to upload your code online to a hoster like Github and collaborate
					with others on a single projet effectively. Git allows you to
					seemlessly merge multiple versions of the same code effectively and
					efficiently. Even if you are working solo on a project, git is still a
					must as it allows you to backup your code and show potentially
					employers what you are capable of. For these reasons I think having
					and using git is a must for all developers. To download Git read{" "}
					<a href="https://github.com/git-guides/install-git">this guide</a> and
					follow the instructions for your operating system.
				</p>
			</div>
			<div className="mb-5">
				<h3>#3 - Virtual Cottage</h3>
				<img
					src="/Blog/TopToolsForDevs2022/virtual-cottage.jpg"
					className="largeimg"
				/>
				<p>
					Virtual Cottage is a productivity app designed to minimize
					distractions and allowing you to focus to the best of your ability. It
					achieves this by providing a calming sound track of Lo-fi music,
					coupled with the ambience of being at a cottage. This app will surely
					help you focus and give you good vibes during your work sessions. To
					download simply visit{" "}
					<a href="https://dui.itch.io/virtual-cottage">this link</a> and select
					the version for your operating system.
				</p>
			</div>
			<div className="mb-5">
				<h3>#4 - Steam</h3>
				<img
					src="/Blog/TopToolsForDevs2022/Steam_icon.png"
					className="largeimg"
				/>
				<p>
					Many people think of steam as just a webstore for pc games, but in
					reality it is much more. Firstly, many popular development programs
					are easily downloadable through the steam, such as the previously
					mentioned Virtual Cottage. Not only that but steam can also serve as a
					hub app for accessing all of your other applications quickly as it
					allows you to link any runnable program on your computer. For these
					reasons steam is not just for gamers but also for anyone looking to
					improve their productivity. To use steam, download it from{" "}
					<a href="https://store.steampowered.com/about/">the steam website</a>{" "}
					and create an account to start downloading apps.
				</p>
			</div>
			<div className="mb-5">
				<h3>#5 - Filezilla</h3>
				<img
					src="/Blog/TopToolsForDevs2022/FileZilla.png"
					className="largeimg"
				/>
				<p>
					FileZilla is an FTP client program that allows you to remotely ssh
					into your servers for file transfers. Although you could do perform
					the same processes through your command line FileZilla makes the ssh
					process and file transfers so much easier and more time efficient.
					Thus if you are in the web development field or are running programs
					which require a server a highly recommend getting FileZilla. To use
					FileZilla, go to{" "}
					<a href="https://filezilla-project.org/download.php?type=client">
						filezilla-project.org/download.php
					</a>{" "}
					and download the version for your OS.
				</p>
			</div>
		</div>
	);
}
