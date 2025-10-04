// src/components/layout/SideBar.jsx
import CssBaseline from '@mui/material/CssBaseline';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import icon from '../../images/icons.svg';
import NewBoardForm from '../forms/newBoardForm/NewBoardForm';
import MainModal from '../mainModal/MainModal';
import NeedHelpModal from '../forms/needHelpModal/NeedHelpModal';
import sprite from '../../images/icons.svg';
import { Box, Typography, Drawer, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useTheme } from '@mui/material';
import { selectUser } from '../../redux/auth/authSelectors';
import { useGetBoardsQuery } from '../../redux/boards/boardsApi';
import { useAuth } from '../../context/AuthContext';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./logoutDialog.css";

import {
  SideBarStyled,
  LogoIcon,
  PlusIcon,
  HelpIcon,
  LogoutIcon,
  BoardsContainer,
  BoardsList,
  BoardItem,
  BoardLink,
  IconTitle,
  IconsBox,
  Delete,
  Edit,
  TitleBox,
  Title,
  IconButton,
  IconLink,
  Thumb,
  Picture,
  NeedHelpBox,
  CreateBoardButton,
  HelpButton,
  LogoutButton,
} from './Sidebar.styled';
import {
   useAddBoardMutation,
   useUpdateBoardMutation,
   useDeleteBoardMutation
 } from "../../redux/boards/boardsApi";
import { showToast } from '../../App'; // path ihtiyaca göre değişebilir

const SideBar = ({ active, onClick }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [activeBoardTitle, setActiveBoardTitle] = useState('');
  const [activeBoardIcon, setActiveBoardIcon] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoard, setNewBoard] = useState(true);
  const { data = [] } = useGetBoardsQuery();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { boardName } = useParams();

  const [addBoard, result] = useAddBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(selectUser) || { theme: 'light' };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModalHandler = (boardTitle, boardIcon) => {
    setActiveBoardTitle(boardTitle);
    setActiveBoardIcon(boardIcon);
    setOpenEditModal(true);
  };

  const closeAddModal = () => setOpenAddModal(false);
  const closeEditModal = () => setOpenEditModal(false);
  const closeHelpModal = () => setOpenHelpModal(false);

  useEffect(() => {
    if (result.data && newBoard) {
      navigate(`/home/${result.data._id}`);
      setNewBoard(false);
    }
  }, [newBoard, navigate, result.data]);

  const handleSubmit = async (formData, formTitle) => {
    const boardId = boardName;

    if (formTitle === 'New board') {
      try {
        await addBoard({ data: formData });
        closeAddModal();
        setNewBoard(true);
      } catch (e) {
        console.error('addBoard failed:', e);
      }
      return;
    }

    if (formTitle === 'Edit board') {
      try {
        await updateBoard({ boardId, data: formData });
        closeEditModal();
      } catch (e) {
        console.error('updateBoard failed:', e);
      }
      return;
    }
  };

  const deleteBoardHandler = (boardId) => {
    try {
      deleteBoard({ boardId });
      navigate('/home');
    } catch (e) {
      console.error('deleteBoard failed:', e);
    }
  };

  // logout: redux + context + navigate
  const handleLogout = () => {
    dispatch(logOut());
    if (typeof logout === 'function') logout();
    navigate('/');
  };

  // Logout onay modal state & handlers
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const openLogoutModalHandler = () => setOpenLogoutModal(true);
  const closeLogoutModalHandler = () => setOpenLogoutModal(false);
  const confirmLogout = () => {
    // 1️⃣ Toast göster
    showToast('info', 'Logging out...');

    // 2️⃣ Logout işlemleri
    handleLogout();

    // 3️⃣ Modal kapatma
    closeLogoutModalHandler();
  };
  // tema bazlı ikon id'leri
  const logoSvg = user.theme === 'violet' ? '#icon-logo-violet' : '#icon-icon-1';
  const needHelpSvg =
    user.theme === 'light' ? '#icon-help' : '#icon-help-white';
  const logOutSvg =
    user.theme === 'light' ? '#icon-login-green' : '#icon-login-white';

  // Debug: Console'a tema ve icon seçimlerini yazdır
  console.log('Current theme:', user.theme);
  console.log('needHelpSvg:', needHelpSvg);
  console.log('logOutSvg:', logOutSvg);

  const drawerContent = (
    <SideBarStyled
      sx={{
        bgcolor: 'background.default',
        '&::-webkit-scrollbar': { backgroundColor: 'background.warning', width: '8px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'background.info' },
      }}
    >
      <Thumb>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            marginBottom: '60px',
          }}
        >
          <LogoIcon>
            <use href={icon + `${logoSvg}`} xlinkHref={icon + `${logoSvg}`} />
          </LogoIcon>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              letterSpacing: 0.7,
              fontWeight: 600,
              color: 'secondary.dark',
            }}
          >
            Task Pro
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '12px',
            letterSpacing: 0.7,
            fontWeight: 400,
            color: 'text.disabled',
          }}
        >
          My boards
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderTop: '1px solid',
            borderColor: 'primary.contrastText',
            padding: '14px 0',
            marginTop: '8px',
            marginBottom: '40px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              maxWidth: '92px',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: 0.7,
              color: 'secondary.dark',
            }}
          >
            Create a new board
          </Typography>

          <CreateBoardButton onClick={() => setOpenAddModal(true)}>
            <PlusIcon theme={theme}>
              <use href={icon + '#icon-plus-2'} xlinkHref={icon + '#icon-plus-2'} />
            </PlusIcon>
          </CreateBoardButton>
        </Box>

        <BoardsContainer>
          <BoardsList theme={theme}>
            {Array.isArray(data) &&
              data.map((board) => {
                const isSelected = `/home/${board._id}` === location.pathname;

                return (
                  <BoardItem key={board._id} className={isSelected ? 'active-board' : ''}>
                    <BoardLink
                      to={`/home/${board._id}`}
                      state={{ from: location }}
                      theme={theme}
                    >
                      <TitleBox>
                        <IconTitle theme={theme}>
                          <use
                            href={(sprite + (board.icon || '#icon-Project'))}
                            xlinkHref={(sprite + (board.icon || '#icon-Project'))}
                          />
                        </IconTitle>
                        <Title theme={theme}>{board.title}</Title>
                      </TitleBox>
                    </BoardLink>

                    <IconsBox theme={theme}>
                      <IconButton
                        type="button"
                        onClick={() => openEditModalHandler(board.title, board.icon)}
                        aria-label="Edit board"
                      >
                        <Edit>
                          <use href={icon + '#icon-pencil-01'} xlinkHref={icon + '#icon-pencil-01'} />
                        </Edit>
                      </IconButton>
                      <IconLink onClick={() => deleteBoardHandler(board._id)} aria-label="Delete board">
                        <Delete>
                          <use href={icon + '#icon-trash-04'} xlinkHref={icon + '#icon-trash-04'} />
                        </Delete>
                      </IconLink>
                    </IconsBox>
                  </BoardItem>
                );
              })}
          </BoardsList>
        </BoardsContainer>
      </Thumb>

      <Thumb>
        <NeedHelpBox sx={{ backgroundColor: 'background.error' }}>
          <Box>
            <Picture>
              <source srcSet={`${cactus} 1x, ${cactus2x} 2x, ${cactus3x} 3x`} />
              <img srcSet={`${cactus} 1x`} alt="cactus" />
            </Picture>
          </Box>

          <Box sx={{ marginBottom: '18px' }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.42',
                letterSpacing: 0.7,
                color: 'secondary.dark',
              }}
            >
              If you need help with
              <Link
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.33',
                  letterSpacing: 0.7,
                  color: theme.palette.mode === 'light' && theme.palette.primary.main === '#5255BC'
                    ? 'primary.main'
                    : 'rgba(190, 219, 176, 1)',
                  textDecoration: 'none',
                }}
                onClick={openModal}
              >
                {' '}TaskPro
              </Link>
              , check out our support resources or reach out to our customer
              support team.
            </Typography>
          </Box>

          <HelpButton onClick={() => setOpenHelpModal(true)}>
            <HelpIcon theme={theme}>
              <use href={icon + `${needHelpSvg}`} xlinkHref={icon + `${needHelpSvg}`} />
            </HelpIcon>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: 0.7,
                color: 'secondary.dark',
              }}
              variant="body2"
            >
              Need help?
            </Typography>
          </HelpButton>

          {/* Help Modal */}
          <MainModal modalIsOpen={isModalOpen} closeModal={closeModal}>
            <NeedHelpModal closeModal={closeModal} />
          </MainModal>
        </NeedHelpBox>

        {/* Log out bölümü (tek, burada) */}
        <Box
          sx={{
            marginTop: '24px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: 0.7,
          }}
        >

          <Button
            type="button"
            onClick={openLogoutModalHandler}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              p: 0,
              minWidth: 0,
              border: 0,
              '&:hover': { backgroundColor: 'inherit', border: 0 },
            }}
          >

            <LogoutIcon>
              <use href={icon + `${logOutSvg}`} xlinkHref={icon + `${logOutSvg}`} />
            </LogoutIcon>
            <Typography
              sx={{
                color: 'secondary.dark',
                fontFamily: 'Poppins',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: 0.7,
              }}
              variant="body2"
            >
              Log out
            </Typography>

          </Button>

          {/* Logout onay dialogu */}
          <Dialog open={openLogoutModal} onClose={closeLogoutModalHandler}>
            <DialogTitle>Log Out</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to log out?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeLogoutModalHandler} color="secondary">
                      Cancel

              </Button>
              <Button onClick={confirmLogout} color="primary" variant="contained">
                 Yes, log out
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Thumb>
    </SideBarStyled>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Mobil/Tablet: geçici drawer */}
        <Drawer
          variant="temporary"
          open={active}
          onClose={onClick}
          ModalProps={{ keepMounted: true }}
          sx={{
            '@media (min-width: 1440px)': { display: { xs: 'block', sm: 'none' } },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 225 },
            '@media (min-width: 768px)': {
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop: kalıcı drawer */}
        <Drawer
          variant="permanent"
          sx={{
            '@media (max-width: 1439px)': { display: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 225 },
            '@media (min-width: 768px)': {
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        <MainModal modalIsOpen={openAddModal} closeModal={closeAddModal}>
          <NewBoardForm
            formTitle={'New board'}
            btnText={'Create'}
            handleSubmit={handleSubmit}
            closeModal={closeAddModal}
          />
        </MainModal>

        <MainModal modalIsOpen={openEditModal} closeModal={closeEditModal}>
          <NewBoardForm
            formTitle={'Edit board'}
            btnText={'Edit'}
            handleSubmit={handleSubmit}
            boardTitle={activeBoardTitle}
            boardIcon={activeBoardIcon}
            closeModal={closeEditModal}
          />
        </MainModal>

        {/* Help Modal #2 (ModalHelp) */}
        <MainModal modalIsOpen={openHelpModal} closeModal={closeHelpModal}>
          <NeedHelpModal closeModal={closeHelpModal} />
        </MainModal>
      </Box>
    </>
  );
};

export default SideBar;
