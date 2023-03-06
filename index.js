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
    const {state, dispatch, handleSubmit} = props
    const {page, name, email, phone, company, service, budget, error} = state

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
                        onChange={(e) => {dispatch({type: 'setValueClearError', name: "name", value: e.target.value})}} 
                        value={name} ref={nameRef} 
                        error={error.name} />
                    <TextInput 
                        name="Email" type="email" id="email" icon="assets/email.svg" 
                        onChange={(e) => {dispatch({type: 'setValueClearError', name: "email", value: e.target.value})}} 
                        value={email} ref={emailRef} 
                        error={error.email} />
                    <TextInput 
                        name="Phone Number" type="tel" minlength="10" maxlength="14" id="phone" icon="assets/phone.svg" 
                        onChange={(e) => {dispatch({type: 'setValueClearError', name: "phone", value: e.target.value})}}
                        value={phone} ref={phoneRef} 
                        error={error.phone} />
                    <TextInput 
                        name="Company" id="company" icon="assets/company.svg" 
                        onChange={(e) => {dispatch({type: 'setValueClearError', name: "company", value: e.target.value})}}
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
                        onChange={(e) => {dispatch({type: 'setValue', name: "service", value: e.target.value})}} 
                        checked={service == "Development"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Design" 
                        icon="assets/design.svg" 
                        onChange={(e) => {dispatch({type: 'setValue', name: "service", value: e.target.value})}} 
                        checked={service == "Design"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Marketing" 
                        icon="assets/marketing.svg" 
                        onChange={(e) => {dispatch({type: 'setValue', name: "service", value: e.target.value})}} 
                        checked={service == "Marketing"}
                    />
                    <RadioInput 
                        type="service" 
                        value="Other" 
                        icon="assets/other.svg" 
                        onChange={(e) => {dispatch({type: 'setValue', name: "service", value: e.target.value})}} 
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
                        onChange={(e) => {dispatch({type: 'setValue', name: "budget", value: e.target.value})}} 
                        checked={budget == "5000-10000"}
                    />
                    <RadioInput 
                        label="$10,000 - $20,000" 
                        value="10000-20000" 
                        onChange={(e) => {dispatch({type: 'setValue', name: "budget", value: e.target.value})}} 
                        checked={budget == "10000-20000"}
                    />
                    <RadioInput 
                        label="$20,000 - $50,000" 
                        value="20000-50000" 
                        onChange={(e) => {dispatch({type: 'setValue', name: "budget", value: e.target.value})}} 
                        checked={budget == "20000-50000"}
                    />
                    <RadioInput 
                        label="$50,000 +" 
                        value="50000" 
                        onChange={(e) => {dispatch({type: 'setValue', name: "budget", value: e.target.value})}} 
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

const reducer = (state, action) => {
    switch (action.type) {
        case 'setValue':
            return {...state, [action.name]: action.value};
        case 'setValueClearError':
            return {...state, [action.name]: action.value, error: {...state.error, [action.name]: ""}};
        default:
            throw new Error();
    }
}

const Quote = () => {
    /* States */
    const initialFormState = {
        page: 1,
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Development",
        budget: "50000",
        error: {
            name: "",
            email: "",
            phone: "",
            company: ""
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialFormState);    

    /* Refs */
    const inputsRef = React.useRef(null);

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

        newError.name = validateInput("name", state.name);
        newError.email = validateInput("email", state.email);
        newError.phone = validateInput("phone", state.phone);
        newError.company = validateInput("company", state.company);

        dispatch({type: 'setValue', name: "error", value: newError});

        // if (newError.name == "" && newError.email == "" && newError.phone == "" && newError.company == "")
        if (!Object.values(newError).some((value) => Boolean(value)))
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
        if ((state.page == 1 && validateForm()) || (state.page > 1 && state.page < 4))
            dispatch({type: 'setValue', name: "page", value: state.page+1})
    }

    const prevPage = () => {
        if (state.page > 1)
            dispatch({type: 'setValue', name: "page", value: state.page-1})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(
            {
                name: state.name,
                email: state.email,
                phone: state.phone,
                company: state.company,
                service: state.service,
                budget: state.budget
            }
        ));
    }

    return (
    <>
        <div className="content">
            <Stepper page={state.page} start={1} end={4} />
            <QuoteForm 
                state={state}
                ref={inputsRef}
                dispatch={dispatch}
                handleSubmit={handleSubmit} />
        </div>        
        <div className="buttons">
            {state.page == 1 ? <div></div> : <button type="button" className="previous" onClick={prevPage}>Previous step</button>}
            {state.page == 4 ? <div></div> : <button type="button" className="next" onClick={nextPage}>Next step</button>}
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