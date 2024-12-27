import React, { useState } from "react";
import { notification } from "antd";
import Api from "./api_context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function API(props) {

	const [api, contextHolder] = notification.useNotification();
	const AlertData = [api, contextHolder];
	const [Doctor, setDoctor] = useState({});
	const [Client, setClient] = useState({});
	const [Testimonials, setTestimonials] = useState({});
	const [UserData, setUserData] = useState({});
	let navigate = useNavigate();
	const [Invoices, setInvoices] = useState({});
	// const host = 'http://localhost:5000';
	const host = 'https://api.samarpitam.com';
	//  openNotificationWithIcon take four types success info warning error

	const openNotificationWithIcon = (type, Title, des, placement) => {
		api[type]({
			message: Title,
			description: des,
			placement,
		});
	};
	//  Use openNotificationWithIcon( bool,"Register","Register succesfully","bottomLeft");

	async function Sendinvoice(values, bool, id) {
		try {
			if (bool === "success") {

				var { amount, payment, treatment, address, email } = values.user;
				const data = { id, amount, payment, treatment, address };
				if (email) {
					data.email = email;
				}

				const customConfig = {
					headers: {
						"Content-Type": "application/json",
						"token": localStorage.getItem("token")
					},
				};


					const response = await axios.post(
						`${host}/api/consultation/send_invoice`,
						// `${host}/api/consultation/send_invoice`,
						data,
						customConfig,
					);
					const json = await response.data;

					if (json.error === "false") {

						get_Client();
						openNotificationWithIcon( "success","Invoice Send Success", json.msg ,"bottomLeft");

					} else {
						openNotificationWithIcon( "error","Invoice Send Failed", json.msg ,"bottomLeft");
					}


			} else {
				openNotificationWithIcon("error", "Invoice", "Invoice Send Failed", "bottomLeft");
			}
		} catch (error) {
			console.log(error)
			openNotificationWithIcon("error", "Invoice", "Invoice Send Failed", "bottomLeft");
		}
	}

	async function EditProfilepwd(values, bool) {
		try {

			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem("token")
				},
			};

			var { confirm } = values;
			let data = { confirm };

			const respose = await axios.post(
				`${host}/api/auth/Doctor/update`,
				data,
				customConfig
			);
			const json = await respose.data;

			if (json.error === "false") {

				openNotificationWithIcon(bool, "Password Change", json.msg, "bottomLeft");

			} else {
				openNotificationWithIcon("error", "Password Change", json.msg, "bottomLeft");
			}


		} catch (error) {

			openNotificationWithIcon("error", "Password Change", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");

		}
	}

	async function EditDoctor(values, bool, id) {
		try {

			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem("token")
				},
			};

			var { Name, description, Status } = values.user;
			let data = { id, status: Status };

			if (Name) { data.name = Name }
			if (description) { data.description = description }

			const respose = await axios.post(
				`${host}/api/Data/Doctor/update`,
				data,
				customConfig
			);
			const json = await respose.data;

			if (json.error === "false") {

				get_Doctor();
				openNotificationWithIcon(bool, "Doctor Change", json.msg, "bottomLeft");

			} else {
				openNotificationWithIcon("error", "Doctor Change", json.msg, "bottomLeft");
			}


		} catch (error) {

			openNotificationWithIcon("error", "Doctor Change", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");

		}
	}

	async function Editclient(values, bool, id) {
		try {
			if (bool === "success") {

				var { name, email, phone, slot, Status, treatment } = values.user;
				const data = { name, email, phone, slot, Status, treatment, id };

				const customConfig = {
					headers: {
						"Content-Type": "application/json",
						"token": localStorage.getItem("token")
					},
				};


				const respose = await axios.post(
					`${host}/api/consultation/Consultations_update`,
					data,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {

					get_Client();
					openNotificationWithIcon("success", "Consultations Update", json.msg, "bottomLeft");

				} else {
					openNotificationWithIcon("error", "Consultations Update", json.msg, "bottomLeft");
				}


			} else {
				openNotificationWithIcon(bool, "Consultations Update", "Client add failed", "bottomLeft");
			}
		} catch (error) {
			openNotificationWithIcon(bool, "Consultations Update", "Client add failed", "bottomLeft");
		}
	}

	async function Removedoctor(_id, action) {
		try {

			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem("token")
				},
			};


			const respose = await axios.get(
				`${host}/api/Data/Doctor/${_id}/${action}`,
				customConfig
			);
			const json = await respose.data;

			if (json.error === "false") {

				get_Doctor();
				openNotificationWithIcon("success", "Doctor Change", json.msg, "bottomLeft");

			} else {
				openNotificationWithIcon("error", "Doctor Change", json.msg, "bottomLeft");
			}


		} catch (error) {

			openNotificationWithIcon("error", "Doctor Change", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");

		}
	}

	async function Removeclient(_id) {
		try {

			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem("token")
				},
			};


			const respose = await axios.get(
				`${host}/api/Data/client/${_id}`,
				customConfig
			);
			const json = await respose.data;

			if (json.error === "false") {

				get_Client();
				openNotificationWithIcon("success", "client Change", json.msg, "bottomLeft");

			} else {
				openNotificationWithIcon("error", "client Change", json.msg, "bottomLeft");
			}


		} catch (error) {

			openNotificationWithIcon("error", "client Change", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");

		}
	}

	async function get_Invoices() {
		try {
			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem("token")
				},
			};
			const response = await axios.get(
				`${host}/api/Data/Invoiceall`,
				customConfig
			);
			const json = await response.data;
			setInvoices(json);
	
		} catch (error) {
			navigate("/");
			openNotificationWithIcon("error", "Invoices", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
		}
	}
	
		async function get_Doctor() {
		try {
			const customConfig = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const respose = await axios.get(
				`${host}/api/Data/Doctorall`,
				customConfig
			);
			const json = await respose.data;
			setDoctor(json);

		} catch (error) {
			navigate("/");
			openNotificationWithIcon("error", "Doctor", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
		}
	}

	async function Resend_invoice(id) {
		try {

			// Configure custom headers with the token
			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem('token'), // Include the token in the Authorization header
				},
			};
	
			// Make the API request
			const response = await axios.get(
				`${host}/api/consultation/resend_invoice/${id}`, // API endpoint with invoiceId in URL
				customConfig
			);
	
			// Handle the response
			const json = await response.data;
			if (json.error === "false") {
			// Optionally, handle success (e.g., show a notification or message)
			openNotificationWithIcon( "success","Invoice Send Success", json.msg ,"bottomLeft");
			} else {
				openNotificationWithIcon( "error","Invoice Send Failed", json.msg ,"bottomLeft");
			}
	
		} catch (error) {
			console.error('Error resending invoice:', error);
	
			// Handle errors: navigate to a different page or show an error message
			navigate("/");
			openNotificationWithIcon("error", "Invoice", error.response?.data?.msg ? error.response.data.msg : "Server Error", "bottomLeft");
		}
	}
	
	async function get_Doctor() {
		try {
			const customConfig = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const respose = await axios.get(
				`${host}/api/Data/Doctorall`,
				customConfig
			);
			const json = await respose.data;
			setDoctor(json);

		} catch (error) {
			navigate("/");
			openNotificationWithIcon("error", "Doctor", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
		}
	}

	async function get_Client() {
		try {
			const customConfig = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const respose = await axios.get(
				`${host}/api/Data/Client`,
				customConfig
			);
			const json = await respose.data;
			setClient(json);

		} catch (error) {
			navigate("/");
			openNotificationWithIcon("error", "Client", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
		}
	}

	async function get_Testimonials() {
		try {
			const customConfig = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const respose = await axios.get(
				`${host}/api/Data/Testimonialsall`,
				customConfig
			);
			const json = await respose.data;
			setTestimonials(json);

		} catch (error) {
			navigate("/");
			openNotificationWithIcon("error", "Client", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
		}
	}

	async function Remove_Testimonials(_id, action) {
		try {

			const customConfig = {
				headers: {
					"Content-Type": "application/json",
					"token": localStorage.getItem("token")
				},
			};


			const respose = await axios.get(
				`${host}/api/Data/Testimonials/${_id}/${action}`,
				customConfig
			);
			const json = await respose.data;

			if (json.error === "false") {

				get_Testimonials();
				openNotificationWithIcon("success", "Testimonial Change", json.msg, "bottomLeft");

			} else {
				openNotificationWithIcon("error", "Testimonial Change", json.msg, "bottomLeft");
			}


		} catch (error) {

			openNotificationWithIcon("error", "Testimonial Change", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");

		}
	}

	async function LoginFn(values, bool) {
		try {
			if (bool === "success") {

				var data = {
					phone: values.Phone,
					password: values.Password,
				};

				const customConfig = {
					headers: { "Content-Type": "application/json" },
				};

				const respose = await axios.post(
					`${host}/api/auth/Adminlogin`,
					data,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {
					localStorage.setItem("token", json.token);
					openNotificationWithIcon(
						bool,
						"Login",
						"Login succesfull",
						"bottomLeft"
					);
					setTimeout(() => {
						FetchUserFn();
						navigate("/");
					}, 1000);

				}
			} else {
				openNotificationWithIcon(
					"error",
					"Login",
					"Login failed",
					"bottomLeft"
				);
			}
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"Login",
				error.response.data.msg,
				"bottomLeft"
			);
		}
	}

	async function Addoctor(values, bool) {
		try {
			if (bool === "success") {

				const customConfig = {
					headers: { "Content-Type": "application/json" },
				};

				const respose = await axios.post(
					`${host}/api/admin//Doctor/Register`,
					values,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {

					openNotificationWithIcon(bool, "Doctor", "Added succesfull", "bottomLeft");
				}
			} else {

				openNotificationWithIcon("error", "Doctor", "Add failed", "bottomLeft");
			}
		} catch (error) {

			openNotificationWithIcon("error", "Login", error.response.data.msg, "bottomLeft");
		}
	}

	async function LogoutFn() {

		try {

			localStorage.clear();
			navigate('/Login');
			window.location.reload();
			// openNotificationWithIcon( "success","LogOut","LogOut Succesfully","bottomLeft");

		} catch (error) {

			openNotificationWithIcon("error", "LogOut", "error in LogOut", "bottomLeft");

		}
	}

	async function FetchUserFn() {
		try {
			if (localStorage.getItem("token")) {

				const customConfig = {
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("token"),
					},
				};

				const respose = await axios.get(
					`${host}/api/auth/adminauthication`,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {
					localStorage.setItem("user", json.user.name);
					localStorage.setItem("user_id", json.user._id);
					setUserData(json.user);
				}
			}
		} catch (error) {
			setUserData({});
			localStorage.clear();
		}
	}


	return (
		<Api.Provider value={{ get_Testimonials, Resend_invoice, Invoices, get_Invoices, Addoctor, EditProfilepwd, UserData, Sendinvoice, LoginFn, LogoutFn, Remove_Testimonials, Testimonials, Removedoctor, Client, Removeclient, get_Client, EditDoctor, Editclient, get_Doctor, Doctor, AlertData, openNotificationWithIcon }}>
			{props.children}
		</Api.Provider>
	);
}

export default API;
