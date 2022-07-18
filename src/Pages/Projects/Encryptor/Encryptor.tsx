import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import CryptoJS from "crypto-js";
type EncryptState = {
	encryptStr: string;
	decryptStr: string;
};

export default class Encryptor extends React.Component<any, EncryptState> {
	password: string = "";

	constructor(props: any) {
		super(props);

		this.state = {
			encryptStr: "",
			decryptStr: "",
		};

		this.encrypt = this.encrypt.bind(this);
		this.decrypt = this.decrypt.bind(this);
	}

	encrypt() {
		this.setState((state) => {
			return {
				decryptStr: CryptoJS.AES.encrypt(
					state.encryptStr,
					this.password
				).toString(),
			};
		});
	}

	decrypt() {
		this.setState((state) => {
			return {
				encryptStr: CryptoJS.AES.decrypt(
					state.decryptStr,
					this.password
				).toString(CryptoJS.enc.Utf8),
			};
		});
	}

	render() {
		const { encryptStr, decryptStr }: EncryptState = this.state;

		return (
			<Container id="Encryptor" className="text-light">
				<Row className="px-5 mb-2">
					<label>Encrypt:</label>
					<textarea
						rows={5}
						id="encrypt"
						onChange={(e) => {
							this.setState((state) => {
								return { encryptStr: e.target.value };
							});
						}}
						value={encryptStr}
					></textarea>
				</Row>
				<Row className="px-5 mb-2">
					<label>Decrypt:</label>
					<textarea
						rows={5}
						id="decrypt"
						onChange={(e) => {
							this.setState((state) => {
								return { decryptStr: e.target.value };
							});
						}}
						value={decryptStr}
					></textarea>
				</Row>
				<Row className="px-5 mb-2">
					<label>Key:</label>
					<input
						type="password"
						onChange={(e) => {
							this.password = e.target.value;
						}}
					/>
				</Row>
				<Row className="px-5 justify-content-center">
					<Col xs={4}>
						<Row>
							<Button onClick={this.encrypt}>Encrypt</Button>
						</Row>
					</Col>
					<Col xs={4}>
						<Row>
							<Button onClick={this.decrypt}>Decrypt</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}
