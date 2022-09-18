import React from "react";

const articleTitle: string = "How to crack the coding interview.";

const CrackingTheCodeInterview = (): JSX.Element => {
	document.title = articleTitle;
	return (
		<div style={{ fontSize: 24 }}>
			<div className="mb-5">
				<h1>{articleTitle}</h1>
				<h5 className="text-secondary">
					By: Austin Bray - Upload Date: September 16, 2022
				</h5>
				<p>
					The coding interview is one of the most difficult parts of getting a
					job in the field of computer science. Here we will list out some tips
					to cracking the interview to help you get your first job as a
					programmer.
				</p>
			</div>
			<div className="mb-5">
				<h3>#1: Leet Code</h3>
				<p>
					It's not fun, and I certainly did not want to mention it, but it is
					the best way to level up your algorithmic problem solving skills. The
					reason most people feel it doesn't work is because they are taking the
					wrong approach by just doing random problems. The secret is to do a
					list of problems like the blind 75 in moderation along with the other
					methods. Through this you are going to create an impressive profile
					for yourself, while leveling up your problem solving skills, and not
					burning yourself out.
				</p>
			</div>
			<div className="mb-5">
				<h3>#2: Programmers Handbooks</h3>
				<p>
					Programmers handbooks are another great tool that can be used to
					sharpen your skills when it comes to solving difficult CS problems.
					These books will provide a more structured program for working through
					these problems. Although, these books can seem boring at times, they
					provide a good path to follow when discovering new algorithms and
					methods to solve problems. There are a number of these available but
					my person favorite is the competitive programmer's handbook by CSES.
				</p>
			</div>
			<div className="mb-5">
				<h3>#3: Paid Programs</h3>
				<p>
					Of course many people will say these are a scam, but I think a service
					like algo expert can be really useful if you are struggling to learn
					the concepts behind problems. This is because although YouTube has
					many free tutorials, finding high quality ones for your specific area
					of struggle can be difficult. There also aren't many structured
					programs for free online, so a paid service can be useful in some
					circumstances.
				</p>
			</div>
			<div className="mb-5">
				<h3>#4: Building Projects</h3>
				<p>
					Many people think building projects builds implementational skills and
					not problem solving skills, but this is incorrect in my opinion.
					Building projects can not only sharpen your mind on how to get around
					problems, but it will also help you implement the algorithms you
					learn. Not only this, it will also help you work to pick out bugs in
					your code, which you will have to make sure you do in the interview.
				</p>
			</div>
			<div className="mb-5">
				<h3>Conclusion</h3>
				<p>
					In conclusion, I don't think you should do each of these seperately or
					use each one specifically. The tools you choose to use should be
					catered to your learning style, and there is no one best choice for
					this kind of thing. I believe that you should implement all of these
					in some form and in moderation to build a balanced structured program
					which covers all of your bases while still being flexible and diverse
					in content. Of course, optimize this to your needs, but this is just
					my opinion.
				</p>
			</div>
		</div>
	);
};

export default CrackingTheCodeInterview;
