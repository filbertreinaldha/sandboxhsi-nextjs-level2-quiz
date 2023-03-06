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

const Page = (props) => {
    const {page, currentPage} = props
    if (page <= currentPage)
        return <div className="page page-active">{page}</div>
    else
        return <div className="page page-inactive">{page}</div>
}

const Progress = (props) => {
    const {page, currentPage} = props
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

const Stepper = (props) => {
    const {page, start, end} = props
    const stepperElmt = []

    for (let i = start; i <= end; i++) {
        if (i != end) {
            stepperElmt.push(<Page key={`page-`+i} page={i} currentPage={page} />)
            stepperElmt.push(<Progress key={`progress-`+i} page={i} currentPage={page} />)
        } else {
            stepperElmt.push(<Page key={`page-`+i} page={i} currentPage={page} />)
        }
    }

    return (
        <div className="stepper">
            {stepperElmt}
        </div>
    )
}

const TextInput = React.forwardRef((props, ref) => {    
    const {name, id, icon, onChange, value, type="text", minlength, maxlength, error} = props
    return (
        <div className="text-input">
            <input 
                type={type} 
                key={id} 
                id={id} 
                placeholder={name} 
                onChange={onChange} 
                value={value} 
                maxLength={maxlength}
                minLength={minlength}
                ref={ref}
                className={error != "" ? "errorOutline" : ""}
            />
            <img className="icon" src={icon}></img>    
            <label className={error != "" ? "errorColor" : ""}>{name}</label>
            <div className={error != "" ? "error errorColor" : "error"}>{error}</div>
        </div>
    )
})

const RadioInput = (props) => {
    const {type = "", label = "", value, icon = "", checked = false, onChange} = props
    if (type == "service") {
        var key = `service-`+value
        return (
            <div className="service-input">
                <input type="radio" key={key} name="service" id={key} value={value} checked={checked} onChange={onChange} />
                <label htmlFor={key} className="radio-label">{value}</label>
                <div className="icon-div">
                    <img className="icon" src={icon} />
                </div>
            </div>
        )
    } else {
        var key = `budget-`+value
        return (
            <div className="budget-input">
                <input type="radio" name="budget" key={key} id={key} value={value} checked={checked} onChange={onChange} />
                <label htmlFor={key} className="radio-label">{label}</label>
            </div>
        )
    }
}

const QuoteForm = React.forwardRef((props, ref) => {
    const {
        page, 
        name, setName, 
        email, setEmail, 
        phone, setPhone, 
        company, setCompany, 
        error, clearError,
        service, setService,
        budget, setBudget,
        handleSubmit
    } = props

    const nameRef = React.useRef(null)
    const emailRef = React.useRef(null)
    const phoneRef = React.useRef(null)
    const companyRef = React.useRef(null)

    React.useImperativeHandle(ref, () => ({
        focusName: () => {
            nameRef.current.focus();
        },
        focusEmail: () => {
            emailRef.current.focus();
        },
        focusPhone: () => {
            phoneRef.current.focus();
        },
        focusCompany: () => {
            companyRef.current.focus();
        }
    }))

    if (page == 1) {
        return (
            <div className="form">
                <div className="description">
                    <div className="title">Contact details</div>
                    <div className="subtitle">Lorem ipsum dolor sit amet consectetur adipisc.</div>
                </div>
                <div className="inputs page1">
                    <TextInput 
                        name="Name" key="name" id="name" icon="assets/name.svg" 
                        onChange={(e) => {setName(e.target.value); clearError("name")}} 
                        value={name} ref={nameRef} 
                        error={error.name} />
                    <TextInput 
                        name="Email" type="email" id="email" icon="assets/email.svg" 
                        onChange={(e) => {setEmail(e.target.value); clearError("email")}} 
                        value={email} ref={emailRef} 
                        error={error.email} />
                    <TextInput 
                        name="Phone Number" type="tel" minlength="10" maxlength="14" id="phone" icon="assets/phone.svg" 
                        onChange={(e) => {setPhone(e.target.value); clearError("phone")}} 
                        value={phone} ref={phoneRef} 
                        error={error.phone} />
                    <TextInput 
                        name="Company" id="company" icon="assets/company.svg" 
                        onChange={(e) => {setCompany(e.target.value); clearError("company")}} 
                        value={company} ref={companyRef}
                        error={error.company} />
                </div>
            </div>
        )
    } else if (page == 2) {
        return (
            <div className="form">
                <div className="description">
                    <div className="title">Our services</div>
                    <div className="subtitle">Please select which service you are interested in.</div>
                </div>
                <div className="inputs">
                    <RadioInput 
                        type="service" 
                        value="Development" 
                        icon="assets/development.svg" 
                        onChange={(e) => {setService(e.target.value)}} 
                        checked={service == "Development"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Design" 
                        icon="assets/design.svg" 
                        onChange={(e) => {setService(e.target.value)}} 
                        checked={service == "Design"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Marketing" 
                        icon="assets/marketing.svg" 
                        onChange={(e) => {setService(e.target.value)}} 
                        checked={service == "Marketing"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Other" 
                        icon="assets/other.svg" 
                        onChange={(e) => {setService(e.target.value)}} 
                        checked={service == "Other"} 
                    />
                </div>
            </div>
        )
    } else if (page == 3) {
        return (
            <div className="form">
                <div className="description">
                    <div className="title">What's your project budget?</div>
                    <div className="subtitle">Please select the project budget range you have in mind.</div>
                </div>
                <div className="inputs">
                    <RadioInput 
                        label="$5,000 - $10,000" 
                        value="5000-10000" 
                        onChange={(e) => {setBudget(e.target.value)}} 
                        checked={budget == "5000-10000"}
                    />
                    <RadioInput 
                        label="$10,000 - $20,000" 
                        value="10000-20000" 
                        onChange={(e) => {setBudget(e.target.value)}} 
                        checked={budget == "10000-20000"}
                    />
                    <RadioInput 
                        label="$20,000 - $50,000" 
                        value="20000-50000" 
                        onChange={(e) => {setBudget(e.target.value)}} 
                        checked={budget == "20000-50000"}
                    />
                    <RadioInput 
                        label="$50,000 +" 
                        value="50000" 
                        onChange={(e) => {setBudget(e.target.value)}} 
                        checked={budget == "50000"}
                    />
                </div>
            </div>
        )
    } else if (page == 4) {
        return (
            <div className="form form-submit">
                <div className="submit-icon"><img src="assets/submit.svg" /></div>
                <div className="submit-title">Submit your quote request</div>
                <div className="submit-subtitle">
                    Please review all the information you previously typed in
                    the past steps, and if all is okay, submit your message to 
                    receive a project quote in 24 - 48 hours.
                </div>
                <div className="submit-button">
                    <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
})

const Quote = () => {
    /* States */
    const [page, setPage] = React.useState(1);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [service, setService] = React.useState("Development");
    const [budget, setBudget] = React.useState("50000");
    const [error, setError] = React.useState({
        name: "", 
        email: "", 
        phone: "", 
        company: ""
    });

    /* Refs */
    const inputsRef = React.useRef(null);

    const clearError = (type) => {
        if (type == "name")
            setError({...error, name: ""});
        else if (type == "email")
            setError({...error, email: ""});
        else if (type == "phone")
            setError({...error, phone: ""});
        else if (type == "company")
            setError({...error, company: ""});
    }

    const validateInput = (type, value) => {
        if (type == "name") {
            return value == "" ? "Name is required." : "";
        } else if (type == "email") {
            if (value == "")
                return "Email is required.";
            else if (!value.endsWith("@gmail.com"))
                return "Email is invalid.";
            else
                return "";
        } else if (type == "phone") {
            if (value == "")
                return "Phone number is required.";
            else if (!value.startsWith("08"))
                return "Phone number is invalid.";
            else if (value.length < 10 || value.length > 14)
                return "Phone number is invalid.";
            else
                return "";
        } else if (type == "company") {
            return value == "" ? "Company is required." : "";
        }
    }

    const validateForm = () => {
        let newError = {}

        newError.name = validateInput("name", name);
        newError.email = validateInput("email", email);
        newError.phone = validateInput("phone", phone);
        newError.company = validateInput("company", company);

        setError(newError);

        if (newError.name == "" && newError.email == "" && newError.phone == "" && newError.company == "")
            return true;
        else {
            if (newError.name != "")
                inputsRef.current.focusName();
            else if (newError.email != "")
                inputsRef.current.focusEmail();
            else if (newError.phone != "")
                inputsRef.current.focusPhone();
            else if (newError.company != "")
                inputsRef.current.focusCompany();

            return false;
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
            <Stepper page={page} start={1} end={4} />
            <QuoteForm 
                page={page} 
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                phone={phone} setPhone={setPhone}
                company={company} setCompany={setCompany}
                ref={inputsRef}
                service={service} setService={setService}
                budget={budget} setBudget={setBudget}
                error={error} clearError={clearError}
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