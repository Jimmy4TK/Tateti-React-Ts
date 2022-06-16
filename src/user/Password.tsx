import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import { Container } from "react-bootstrap"
import FormPassword from "../common/components/FormPassword"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { changePassword, User } from "./userService"
import { useSessionUser } from "../store/userStore"


export default function Password() {
    const history = useNavigate()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const user:User|undefined = useSessionUser()

    const errorHandler = useErrorHandler()

    const updatePasswordClick = async () => {
        errorHandler.cleanRestValidations()

        if (!currentPassword) {
            errorHandler.addError("currentPassword", "No puede estar vacío")
        }
        if (!newPassword) {
            errorHandler.addError("newPassword", "No puede estar vacío")
        }
        if (newPassword !== newPassword2) {
            errorHandler.addError("newPassword2", "Las contraseñas no coinciden")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await changePassword({
                currentPassword,
                newPassword,
                newPassword2,
                id: user!.id
            })
            history("/")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <Container className="mt-2">
            <GlobalContent>
                <FormTitle>Cambiar Password</FormTitle>

                <Form>
                    <div className="col-5"> 
                        <FormPassword
                            label="Password Actual"
                            name="currentPassword"
                            errorHandler={errorHandler}
                            onChange={event => setCurrentPassword(event.target.value)} />

                        <FormPassword
                            label="Nuevo Password"
                            name="newPassword"
                            errorHandler={errorHandler}
                            onChange={event => setNewPassword(event.target.value)} />

                        <FormPassword
                            label="Repetir Password"
                            name="newPassword2"
                            errorHandler={errorHandler}
                            onChange={event => setNewPassword2(event.target.value)} />

                        <DangerLabel message={errorHandler.errorMessage} />

                        <FormButtonBar>
                            <FormAcceptButton label="Cambiar" onClick={updatePasswordClick} />
                            <FormButton label="Cancelar" onClick={() => history("/")} />
                        </FormButtonBar>
                    </div>
                </Form >
            </GlobalContent>
        </Container>
    )
}
