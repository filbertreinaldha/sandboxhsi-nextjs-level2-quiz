const rootElmt = document.getElementById('root')

/* Components */
const Header = () => {
    return (
        <div className="header">
            <div id="quote">Get a project quote</div>
            <div id="fill">Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</div>
        </div>
    )
}

const Page = ({page, currentPage}) => {
    if (page <= currentPage)
        return <div className="page page-active">{page}</div>
    else
        return <div className="page page-inactive">{page}</div>
}

const Progress = ({page, currentPage}) => {
    if (page < currentPage)
        return (
            <div className="progress">
                <div className="bg"></div>
                <div className="full"></div>
            </div>
        )
    else if (page == currentPage)
        return (
            <div className="progress">
                <div className="bg"></div>
                <div className="half"></div>
            </div>
        )
    else
        return (
            <div className="progress">
                <div className="bg"></div>
            </div>
        )   
}

const TextInput = ({name, id, icon, onChange, value, type="text", minlength, maxlength, inputref}) => {    
    return (
        <div className="text-input" ref={inputref}>
            <input 
                type={type} 
                key={id} 
                id={id} 
                placeholder={name} 
                onChange={onChange} 
                value={value} 
                maxlength={maxlength}
                minlength={minlength}
            />
            <img className="icon" src={icon}></img>    
            <label htmlFor="">{name}</label>
            <div className="error"></div>
        </div>
    )
}

const RadioInput = ({type = "", label = "", value, icon = "", checked = false, onChange}) => {
    if (type == "service") {
        var key = `service-`+value
        return (
            <label className="radio-input service-input">
                <input type="radio" key={key} name="service" id={key} value={value} checked={checked} onChange={onChange} />
                <div className="icon-div">
                    <img className="icon" src={icon} />
                </div>
                <span>{value}</span>
            </label>
        )
    } else {
        var key = `budget-`+value
        return (
            <label className="radio-input budget-input">
                <input type="radio" name="budget" key={key} id={key} value={value} checked={checked} onChange={onChange} />
                <span>{label}</span>
            </label>
        )
    }
}

const removeError = (inputRef) => {
    const current = inputRef.current;
    const children = current.children;

    if (children[0].className.endsWith("errorOutline")) {
        children[0].className = children[0].className.replace(" errorOutline","");
        children[2].className = children[2].className.replace(" errorColor","");
        children[3].className = children[3].className.replace(" errorColor","");
        children[3].innerHTML = "";
    }
}

const QuoteForm = (props) => {
    if (props.page == 1) {
        return (
            <div class="form">
                <div className="description">
                    <div class="title">Contact details</div>
                    <div class="subtitle">Lorem ipsum dolor sit amet consectetur adipisc.</div>
                </div>
                <div class="inputs page1">
                    <TextInput 
                        name="Name" key="name" id="name" icon="assets/name.png" 
                        onChange={(e) => {props.setName(e.target.value); removeError(props.nameRef)}} 
                        value={props.name} inputref={props.nameRef} />
                    <TextInput 
                        name="Email" type="email" id="email" icon="assets/email.png" 
                        onChange={(e) => {props.setEmail(e.target.value); removeError(props.emailRef)}} 
                        value={props.email} inputref={props.emailRef} />
                    <TextInput 
                        name="Phone Number" type="tel" minlength="10" maxlength="14" id="phone" icon="assets/phone.png" 
                        onChange={(e) => {props.setPhone(e.target.value); removeError(props.phoneRef)}} 
                        value={props.phone} inputref={props.phoneRef} />
                    <TextInput 
                        name="Company" id="company" icon="assets/company.png" 
                        onChange={(e) => {props.setCompany(e.target.value); removeError(props.companyRef)}} 
                        value={props.company} inputref={props.companyRef} />
                </div>
            </div>
        )
    } else if (props.page == 2) {
        return (
            <div class="form">
                <div className="description">
                    <div class="title">Our services</div>
                    <div class="subtitle">Please select which service you are interested in.</div>
                </div>
                <div class="inputs">
                    <RadioInput 
                        type="service" 
                        value="Development" 
                        icon="assets/development.png" 
                        onChange={(e) => {props.setService(e.target.value)}} 
                        checked={props.service == "Development"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Design" 
                        icon="assets/design.png" 
                        onChange={(e) => {props.setService(e.target.value)}} 
                        checked={props.service == "Design"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Marketing" 
                        icon="assets/marketing.png" 
                        onChange={(e) => {props.setService(e.target.value)}} 
                        checked={props.service == "Marketing"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Other" 
                        icon="assets/other.png" 
                        onChange={(e) => {props.setService(e.target.value)}} 
                        checked={props.service == "Other"} 
                    />
                </div>
            </div>
        )
    } else if (props.page == 3) {
        return (
            <div class="form">
                <div className="description">
                    <div class="title">What's your project budget?</div>
                    <div class="subtitle">Please select the project budget range you have in mind.</div>
                </div>
                <div class="inputs">
                    <RadioInput 
                        label="$5,000 - $10,000" 
                        value="5000-10000" 
                        onChange={(e) => {props.setBudget(e.target.value)}} 
                        checked={props.budget == "5000-10000"}
                    />
                    <RadioInput 
                        label="$10,000 - $20,000" 
                        value="10000-20000" 
                        onChange={(e) => {props.setBudget(e.target.value)}} 
                        checked={props.budget == "10000-20000"}
                    />
                    <RadioInput 
                        label="$20,000 - $50,000" 
                        value="20000-50000" 
                        onChange={(e) => {props.setBudget(e.target.value)}} 
                        checked={props.budget == "20000-50000"}
                    />
                    <RadioInput 
                        label="$50,000 +" 
                        value="50000" 
                        onChange={(e) => {props.setBudget(e.target.value)}} 
                        checked={props.budget == "50000"}
                    />
                </div>
            </div>
        )
    } else if (props.page == 4) {
        return (
            <div class="form form-submit">
                <div class="submit-icon"><img src="assets/submit.png" /></div>
                <div class="submit-title">Submit your quote request</div>
                <div class="submit-subtitle">
                    Please review all the information you previously typed in
                    the past steps, and if all is okay, submit your message to 
                    receive a project quote in 24 - 48 hours.
                </div>
                <div class="submit-button">
                    <button type="submit" className="submit" onClick={props.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

const Pages = ({page}) => {
    return (
        <div className="pages">
            <Page page={1} currentPage={page} />
            <Progress page={1} currentPage={page} />
            <Page page={2} currentPage={page} />
            <Progress page={2} currentPage={page} />
            <Page page={3} currentPage={page} />
            <Progress page={3} currentPage={page} />
            <Page page={4} currentPage={page} />
        </div>
    )
}

const Quote = () => {
    /* States */
    const [page, setPage] = React.useState(1);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [service, setService] = React.useState("Development");
    const [budget, setBudget] = React.useState("50000");

    /* Refs */
    const nameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const phoneRef = React.useRef(null);
    const companyRef = React.useRef(null);

    const validateForm = () => {
        var nameError = validateInput("name");
        var emailError = validateInput("email");
        var phoneError = validateInput("phone");
        var companyError = validateInput("company");

        var nameChildren = nameRef.current.children;
        var emailChildren = emailRef.current.children;
        var phoneChildren = phoneRef.current.children;
        var companyChildren = companyRef.current.children;

        if (nameError != "") {
            nameChildren[0].className += " errorOutline";
            nameChildren[2].className += " errorColor";
            nameChildren[3].className += " errorColor";
            nameChildren[3].innerHTML = nameError;
        }

        if (emailError != "") {
            emailChildren[0].className += " errorOutline";
            emailChildren[2].className += " errorColor";
            emailChildren[3].className += " errorColor";
            emailChildren[3].innerHTML = emailError;
        }

        if (phoneError != "") {
            phoneChildren[0].className += " errorOutline";
            phoneChildren[2].className += " errorColor";
            phoneChildren[3].className += " errorColor";
            phoneChildren[3].innerHTML = phoneError;
        }

        if (companyError != "") {
            companyChildren[0].className += " errorOutline";
            companyChildren[2].className += " errorColor";
            companyChildren[3].className += " errorColor";
            companyChildren[3].innerHTML = companyError;
        }
        
        if (nameError != "") {
            nameChildren[0].focus();
            return false;
        } else if (emailError != "") {
            emailChildren[0].focus();
            return false;
        } else if (phoneError != "") {
            phoneChildren[0].focus();
            return false;
        } else if (companyError != "") {
            companyChildren[0].focus();
            return false;
        } else
            return true;
    }

    const validateInput = (type) => {
        if (type == "name") {
            return name == "" ? "Name is required." : "";
        } else if (type == "email") {
            if (email == "")
                return "Email is required.";
            else if (!email.endsWith("@gmail.com"))
                return "Email is invalid.";
            else
                return "";
        } else if (type == "phone") {
            if (phone == "")
                return "Phone number is required.";
            else if (!phone.startsWith("08"))
                return "Phone number is invalid.";
            else if (phone.length < 10 || phone.length > 14)
                return "Phone number is invalid.";
            else
                return "";
        } else if (type == "company") {
            return company == "" ? "Company is required." : "";
        }
    }

    const nextPage = () => {
        if ((page == 1 && validateForm()) || (page > 1 && page < 4))
            setPage(page+1)
    }

    const prevPage = () => {
        if (page > 1)
            setPage(page-1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(
            {
                name: name,
                email: email,
                phone: phone,
                company: company,
                service: service,
                budget: budget
            }
        ));
    }

    return (
    <>
        <div className="content">
            <Pages page={page} />
            <QuoteForm 
                page={page} 
                name={name} setName={setName} nameRef={nameRef}
                email={email} setEmail={setEmail} emailRef={emailRef}
                phone={phone} setPhone={setPhone} phoneRef={phoneRef}
                company={company} setCompany={setCompany} companyRef={companyRef}
                service={service} setService={setService}
                budget={budget} setBudget={setBudget}
                handleSubmit={handleSubmit} />
        </div>        
        <div className="buttons">
            {page == 1 ? <div></div> : <button type="button" className="previous" onClick={prevPage}>Previous step</button>}
            {page == 4 ? <div></div> : <button type="button" className="next" onClick={nextPage}>Next step</button>}
        </div>
    </>
    )
}

const elmt = 
    <>
        <Header />
        <Quote />
    </>

const root = ReactDOM.createRoot(rootElmt)
root.render(elmt)