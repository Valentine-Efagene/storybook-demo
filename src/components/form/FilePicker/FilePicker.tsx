import { FilePond, FilePondProps, registerPlugin } from 'react-filepond'
import style from './FilePicker.module.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

interface IProps extends FilePondProps {
  className?: string | null
}

export default function FilePicker({ className, ...rest }: IProps) {

  // Register Filepond plugins
  registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginFileValidateSize,
    FilePondPluginImageTransform
  )

  return (
    <div className={`${className} ${style.container}`}><FilePond {...rest}
      allowReorder={false}
      credits={false}
    /></div>
  );
}
