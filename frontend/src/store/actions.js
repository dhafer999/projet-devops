export * from "./layout/actions"

// Authentication module
export * from "./auth/register/actions"
export * from "./auth/login/actions"
export * from "./auth/forgetpwd/actions"
export * from "./auth/profile/actions"

//Ecommerce
export * from "./e-commerce/actions"

//Calendar
export * from "./calendar/actions"

//chat
export * from "./chat/actions"

//crypto
export * from "./crypto/actions"

//invoices
export * from "./invoices/actions"

// projects
export * from "./projects/actions"

// tasks
export * from "./tasks/actions"

// contacts
export * from "./contacts/actions"

// contacts
export * from "./mails/actions"

//dashboard
export * from "./dashboard/actions";

//dashboard-saas
export * from "./dashboard-saas/actions";


export let config = {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  }
  
  export let fireuser = `{
    email: "admin@themesbrand.com",
    password: "123456",
    role: "admin",
    uid: 1,
    username: "admin",
  }`