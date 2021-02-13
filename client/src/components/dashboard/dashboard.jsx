import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import './dashboard.scss'

import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

// API 😄
import {
	loadIBS,
	createIBS,
	deleteIBS
} from '../../redux/idea-boards/ideaBoardsActions'

// Components
import BrandLogo from '../brand-logo/brand-logo'
import DashboardCards from './dashboard-cards/dashboard-cards'
import User from '../user/user'
import LoadingSpinner from '../loading-spinner/loading-spinner'
import Collaborators from './collaborators/collaborators'

// Logos
import AddBtn from '../../img/add-button.svg'
import Idea from '../../img/idea.svg'

const initialValues = {
	idea_board_name: '',
	idea_board_description: ''
}

const validate = (values) => {
	let errors = {}

	if (!values.idea_board_name) {
		errors.idea_board_name = 'Required'
	} else if (values.idea_board_name.length >= 20) {
		errors.idea_board_name = 'Name too long'
	}

	if (!values.idea_board_description) {
		errors.idea_board_description = 'Required'
	} else if (values.idea_board_description.length > 30) {
		errors.ide_board_description = 'Description too long'
	}

	return errors
}

const TextError = (props) => <div className='error-msg'>{props.children}</div>

function Dashboard({ user, idea_boards, loadIBS, createIBS, deleteIBS }) {
	// Visibility toggle for 'Create New IdeaBoard' Modal
	const [visible, setVisible] = useState(false)

	// Reset Form Reference
	const resetForm = React.useRef(null)

	const [editModal, setEditModal] = useState({
		id: '',
		visible: false
	})
	const [deleteModal, setDeleteModal] = useState({
		id: '',
		board_name: '',
		visible: false
	})

	const customStyles = {
		wrapper: {
			backgroundColor: '#1F2023',
			background:
				'linear-gradient(144.37deg, rgba(22, 22, 22, 0.86) 0%, rgba(22, 22, 22, 0.757406) 6.67%, rgba(23, 23, 23, 0.749347) 13.33%, rgba(23, 23, 23, 0.635502) 20%, rgba(24, 24, 24, 0.615777) 26.67%, rgba(24, 25, 25, 0.590468) 33.33%, rgba(25, 26, 27, 0.560435) 40%, rgba(26, 27, 28, 0.527193) 46.67%, rgba(27, 28, 29, 0.492807) 53.33%, rgba(28, 29, 31, 0.459565) 60%, rgba(29, 30, 32, 0.429532) 66.67%, rgba(30, 31, 33, 0.404223) 73.33%, rgba(30, 31, 34, 0.384498) 80%, rgba(31, 32, 35, 0.370653) 86.67%, rgba(31, 32, 35, 0.362594) 93.33%, rgba(31, 32, 35, 0.36) 100%)',
			borderLeft: '1px solid rgba(234,236,239, 0.3)',
			borderTop: '1px solid rgba(234,236,239, 0.3)',
			borderRight: '1px solid rgba(234,236,239, 0.2)',
			borderBottom: '1px solid rgba(234,236,239, 0.2)',
			borderRadius: '5px'
		}
	}
	const customStylesLight = {
		wrapper: {
			backgroundColor: '#1F2023',
			background: 'linear-gradient(103.23deg, rgba(164, 238, 254, 0.2) 0%, rgba(165, 238, 254, 0.199654) 6.67%, rgba(166, 238, 254, 0.19858) 13.33%, rgba(169, 239, 254, 0.196734) 20%, rgba(173, 239, 254, 0.194104) 26.67%, rgba(178, 240, 254, 0.190729) 33.33%, rgba(184, 241, 254, 0.186725) 40%, rgba(190, 242, 254, 0.182292) 46.67%, rgba(197, 244, 254, 0.177708) 53.33%, rgba(203, 245, 254, 0.173275) 60%, rgba(209, 246, 254, 0.169271) 66.67%, rgba(214, 247, 254, 0.165896) 73.33%, rgba(218, 247, 254, 0.163266) 80%, rgba(221, 248, 254, 0.16142) 86.67%, rgba(222, 248, 254, 0.160346) 93.33%, rgba(223, 248, 254, 0.16) 100%)',
			border: '1px solid #282C34',
			borderRadius: '5px'
		}
	}

	useEffect(() => {
		document.title = 'Craft Dash | Dashboard'
		loadIBS()
	}, [loadIBS])

	// Modal form onSubmit Handler for creating a new IdeaBoard (IdeaBoard Name, Description)
	const onSubmit = (values, { resetForm }) => {
		console.log(values)
		createIBS({ email: user.email, username: user.username, ...values })
		resetForm()
		setVisible((preVal) => !preVal)
	}

	// Delete Handler
	const deleteHandler = (id, board_name, visible) => {
		console.log(`[deleteHandler] ${(id, board_name, visible)}`)

		setDeleteModal({
			id,
			board_name,
			visible
		})
	}

	// Edit Handler
	const editHandler = (id, visible) => {
		console.log(`[editHandler] ${(id, visible)}`)

		setEditModal({
			id,
			visible
		})
	}

	// optionsBtn Handler
	const optionsBtnHandler = (action) => {
		if (action === 'YES') {
			deleteIBS(deleteModal.id)
		} else {
			setDeleteModal({ ...deleteModal, visible: false })
		}
	}

	return (
		<div className='dashboard-light'>
			<div className='top-nav-light'>
				<div className='brand-logo-wrapper-light'>
					<BrandLogo
						fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }}
						logoStyles={{ width: '30px' }}
					/>
				</div>
				<div className='add-btn-light'>
					<img
						src={AddBtn}
						onClick={() => setVisible(true)}
						alt='Create New Idea Board'
					/>
				</div>
				<div className='user-wrapper-light'>
					<User />
				</div>
			</div>

			<div className='dashboard-title-light'>
				<h1>Dashboard</h1>
			</div>

			<div className='dashboard-cards-wrapper-light'>
				{idea_boards.boards.data.length !== 0
					? idea_boards.boards.data.map((idea_board) => {
							return (
								<DashboardCards
									key={idea_board._id}
									_id={idea_board._id}
									title={`${idea_board.idea_board_name}`}
									deleteHandler={deleteHandler}
									editHandler={editHandler}
								/>
							)
					  })
					: null}
			</div>

			<Rodal
				className='rodal-bg-blur-light'
				visible={editModal.visible}
				onClose={() => setEditModal({ ...editModal, visible: false })}
				animation='fade'
				width={720}
				height={600}
				customStyles={customStylesLight.wrapper}>
				<Collaborators idea_board_id={`${editModal.id}`} />
			</Rodal>

			<Rodal
				className='rodal-bg-blur-light'
				visible={deleteModal.visible}
				onClose={() => setDeleteModal({ ...deleteModal, visible: false })}
				animation='fade'
				width={450}
				height={200}
				customStyles={customStylesLight.wrapper}>
				<div className='delete-modal-light'>
					{idea_boards.delete_board.info &&
					idea_boards.delete_board.info._id === deleteModal.id ? (
						<h2 className='post-delete-light'>
							<b>{idea_boards.delete_board.info.idea_board_name}</b> Deleted
							Successfully
						</h2>
					) : (
						<h2 className='pre-delete-light'>
							Are you sure you want to delete IdeaBoard -{' '}
							<b>{deleteModal.board_name}?</b>
						</h2>
					)}

					<div className='yn-light'>
						{idea_boards.delete_board.isLoading ? (
							<LoadingSpinner color='#0087cc' />
						) : idea_boards.delete_board.info &&
						  idea_boards.delete_board.info._id === deleteModal.id ? null : (
							<div>
								<button
									className='yes-light'
									onClick={() => optionsBtnHandler('YES')}>
									YES
								</button>
								<button className='no-light' onClick={() => optionsBtnHandler('NO')}>
									NO
								</button>
							</div>
						)}
					</div>
				</div>
			</Rodal>

			<Rodal
				className='rodal-bg-blur-light'
				visible={visible}
				onClose={() =>
					setVisible((preVal) => {
						resetForm.current()
						return !preVal
					})
				}
				animation='fade'
				width={450}
				height={480}
				customStyles={customStylesLight.wrapper}>
				<div className='ideaboard-modal-light'>
					<div className='ideaboard-header-light'>
						<img src={Idea} alt='Idea' />
						<h1 className='ideaboard-title-light'>Create New IdeaBoard</h1>
					</div>
					<div className='idea-board-form-light'>
						<Formik
							initialValues={initialValues}
							validate={validate}
							onSubmit={onSubmit}>
							{(formik) => {
								resetForm.current = formik.resetForm
								return (
									<Form>
										<div className='input-group-light'>
											<label htmlFor='idea_board_name'>
												IdeaBoard name <span className='asterisk-light'>*</span>
											</label>
											<Field
												type='text'
												name='idea_board_name'
												id='idea_board_name'
												autoComplete='off'
												disabled={idea_boards.new_board.isLoading}
											/>
											<div className='error-msg-wrapper-light'>
												<ErrorMessage
													name='idea_board_name'
													component={TextError}
												/>
											</div>
										</div>
										<div className='input-group-light'>
											<label htmlFor='idea_board_description'>
												Description <span className='asterisk'>*</span>
											</label>
											<Field
												as='textarea'
												name='idea_board_description'
												id='idea_board_name'
												autoComplete='off'
												disabled={idea_boards.new_board.isLoading}
											/>
											<div className='error-msg-wrapper-light'>
												<ErrorMessage
													name='idea_board_description'
													component={TextError}
												/>
											</div>
										</div>
										<div className='create-btn-light'>
											{idea_boards.new_board.isLoading ? (
												<LoadingSpinner color='#0087cc' />
											) : (
												<button type='submit'>Create</button>
											)}
										</div>
									</Form>
								)
							}}
						</Formik>
					</div>
				</div>
			</Rodal>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		idea_boards: state.idea_boards
	}
}

export default connect(mapStateToProps, { loadIBS, createIBS, deleteIBS })(
	Dashboard
)
