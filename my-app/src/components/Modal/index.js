import './modal.css'
import { FiX } from 'react-icons/fi';
const Modal = ({content, close}) => {
    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={23} color="#FFF"/>
                    Close
                </button>
                <div>
                    <h2>Ticket Details</h2>

                    <div className="row">
                        <span>
                            Customer: <i>{content.customer}</i>                            
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Title: <i>{content.title}</i>
                        </span>
                        <span>
                            Created On: <i>{content.createdOn}</i>                            
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Status: <i style={{color: '#FFF', backgroundColor: content.status === 'Open' ? '#5cb85c' : '#999'}}>
                                {content.status}</i>                            
                        </span>
                    </div>
                    {content.complement && (
                        <>
                            <h3>Complement</h3>
                            <p>{content.complement}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;