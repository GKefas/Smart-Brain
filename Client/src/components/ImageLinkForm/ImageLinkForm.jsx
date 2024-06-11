import './ImageLinkForm.css';
import { MDBBtn } from 'mdb-react-ui-kit';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <>
            <div className='center w-90 centerInputs'>
                <input className="f4 pa2 w-70 inputUrl" type="text" onChange={onInputChange} placeholder='Enter image url' />
                <MDBBtn className='w-30 detectBtn' onClick={onPictureSubmit}>
                    Detect
                </MDBBtn>
            </div>


        </>
    );
}

export default ImageLinkForm;