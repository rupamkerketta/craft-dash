import React, { useState } from 'react'
import { connect } from 'react-redux'
import { server } from '../../../../utils/api'

// Redux Dispatches
import { viewFileInfo } from '../../../../redux/view-file/viewFilesActions'

// Icons
import OpenFileIcon from '../../../../img/open_file.svg'

// Styles
import './my-file-node.scss'
import ProvideThumbnail from '../../../dashboard/cloud/provide-thumbnail/provide-thumbnail'

function MyFileNode({
	file_name,
	file_type,
	original_file_name,
	file_thumbnail,
	viewFileInfo
}) {
	const viewFileHandler = () => {
		viewFileInfo({
			file_name,
			file_type,
			file_thumbnail,
			original_file_name
		})
	}

	return (
		<div className='my-file-node'>
			<DisplayContent
				file_name={file_name}
				file_type={file_type}
				file_thumbnail={file_thumbnail}
				original_file_name={original_file_name}
				viewFileHandler={viewFileHandler}
			/>
		</div>
	)
}

const DisplayContent = ({
	file_name,
	file_type,
	file_thumbnail,
	original_file_name,
	viewFileHandler
}) => {
	return (
		<div className='display-content'>
			<FileTypeHandler
				file_name={file_name}
				file_type={file_type}
				file_thumbnail={file_thumbnail}
				original_file_name={original_file_name}
			/>
			<div className='icon-wrapper'>
				<img
					src={OpenFileIcon}
					alt='Open File'
					onClick={() => viewFileHandler()}
				/>
			</div>

			<div className='file-name'>
				<h3>{original_file_name}</h3>
			</div>
		</div>
	)
}

const FileTypeHandler = ({
	file_name,
	file_type,
	file_thumbnail,
	original_file_name
}) => {
	// Splitting the MIME type
	const type_arr = file_type.split('/')

	const type_p1 = type_arr[0]

	if (type_p1 === 'audio') {
		return (
			<div className='audio'>
				<audio controls>
					<source
						src={`${server}/api/cloud-storage/get-file/${file_name}`}
						type={file_type}
					/>
				</audio>
				<h2>{original_file_name}</h2>
			</div>
		)
	} else {
		return (
			<div className='doc'>
				<ProvideThumbnail
					file_thumbnail={file_thumbnail}
					original_file_name={original_file_name}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		viewFile: state.viewFile
	}
}

const mapDispatchToProps = {
	viewFileInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFileNode)
