import { useState } from 'react';
import { Box, Button, Typography, Drawer, Link } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';

import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import MainModal from '../mainModal/MainModal';
import NewBoardForm from '../forms/newBoardForm/NewBoardForm';
import NeedHelpModal from '../forms/needHelpModal/NeedHelpModal';

import { logOut } from '../../redux/auth/authOperations';
import { selectUser } from '../../redux/auth/authSelectors';
import { useGetBoardsQuery } from '../../redux/boards/boardsApi';
import {
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../../redux/boards/boardsApi';

// context logout + navigate (logout tamam)
import { useAuth } from '../../context/AuthContext';
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
} from './Sidebar.styled';

const SPRITE = import.meta.env.BASE_URL + 'icons.svg';
const SideBar = ({ active, onClick }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const user = useSelector(selectUser) || { theme: 'light' };
  const location = useLocation();
  const { boardId } = useParams();

  const { data = [] } = useGetBoardsQuery();
  const [addBoard] = useAddBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  // modallar
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);

  // edit icin aktif baslik/icon
  const [activeBoardTitle, setActiveBoardTitle] = useState('');
  const [activeBoardIcon, setActiveBoardIcon] = useState('');

  const openHelp = () => setOpenHelpModal(true);
  const closeHelp = () => setOpenHelpModal(false);
  const closeAdd = () => setOpenAddModal(false);
  const closeEdit = () => setOpenEditModal(false);

  const openEditModalHandler = (boardTitle, boardIcon) => {
    setActiveBoardTitle(boardTitle);
    setActiveBoardIcon(boardIcon);
    setOpenEditModal(true);
  };

  // board olusturma / guncelleme
  const handleSubmit = async (formData, formTitle) => {
    const currentBoardId = boardId;

    if (formTitle === 'New board') {
      try {
        const res = await addBoard({ data: formData }).unwrap();
        closeAdd();
        if (res && res._id) navigate(`/home/${res._id}`);
      } catch (e) {
        // TODO: toast/snackbar
        console.error('addBoard failed:', e);
      }
      return;
    }

    if (formTitle === 'Edit board') {
      try {
        await updateBoard({ boardId: currentBoardId, data: formData }).unwrap();
        closeEdit();
      } catch (e) {
        console.error('updateBoard failed:', e);
      }
      return;
    }
  };

  const deleteBoardHandler = async (id) => {
    try {
      await deleteBoard({ boardId: id }).unwrap();
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

  // tema bazli ikonlar
  const logoSvg = user.theme === 'violet' ? '#icon-Logo-violet' : '##icon-logo';
  const needHelpSvg =
    user.theme === 'violet' || user.theme === 'dark'
      ? '#icon-help-circle'
      : '#icon-help-circle';
  const logOutSvg =
    user.theme === 'dark' || user.theme === 'light'
      ? '#icon-login'
      : '#icon-login';

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
            mb: '60px',
          }}
        >
          <LogoIcon>
            <use href={`${SPRITE}${logoSvg}`} xlinkHref={`${SPRITE}${logoSvg}`} />
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
          >          Task Pro
        </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: '14px',
            mb: '40px',
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
          <Button
            type="button"
            onClick={() => setOpenAddModal(true)}
            data-create-board
            sx={{
              backgroundColor: 'secondary.warning',
              p: '8px 10px',
              minWidth: 0,
              transition: 'background-color 200ms linear',
              '&:hover': { backgroundColor: 'text.error' },
            }}
          >
            <PlusIcon theme={theme}>
              <use href={`${SPRITE}#icon-plus`} xlinkHref={`${SPRITE}#icon-plus`} />
            </PlusIcon>
          </Button>
        </Box>

        <BoardsContainer>
          <BoardsList theme={theme}>
            {Array.isArray(data) &&
              data.map((board) => {
                const isSelected = `/home/${board._id}` === location.pathname;
                return (
                  <BoardItem key={board._id}>
                    <BoardLink
                      to={`/home/${board._id}`}
                      state={{ from: location }}
                      theme={theme}
                    >
                      <TitleBox>
                        <IconTitle theme={theme}>
                          {/* board.icon unicode ise <use> calismaz; sprite id ise calisir */}
                          <use href={`${SPRITE}${board.icon || '#icon-Project'}`} xlinkHref={`${SPRITE}${board.icon || '#icon-Project'}`} />
                        </IconTitle>
                        <Title theme={theme}>{board.title}</Title>
                      </TitleBox>
                    </BoardLink>

                    {isSelected && (
                      <IconsBox theme={theme}>
                        <IconButton
                          type="button"
                          aria-label="Edit board"
                          onClick={() =>
                            openEditModalHandler(board.title, board.icon)
                          }
                        >
                          <Edit>
                            <use href={`${SPRITE}#icon-pencil`} xlinkHref={`${SPRITE}#icon-pencil`} />
                          </Edit>
                        </IconButton>
                        <IconLink
                          aria-label="Delete board"
                          onClick={() => deleteBoardHandler(board._id)}
                        >
                          <Delete>
                            <use href={`${SPRITE}#icon-trash`} xlinkHref={`${SPRITE}#icon-trash`} />
                          </Delete>
                        </IconLink>
                      </IconsBox>
                    )}
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
              <img
                src={cactus}
                srcSet={`${cactus2x} 2x, ${cactus3x} 3x`}
                alt="cactus"
              />
            </Picture>
          </Box>

          <Box sx={{ mb: '18px' }}>
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
                component="button"
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.33',
                  letterSpacing: 0.7,
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
                onClick={openHelp}
              >
                {' '}TaskPro
              </Link>
              , check out our support resources or reach out to our customer support team.
            </Typography>
          </Box>

          <Button
            type="button"
            onClick={() => setOpenHelpModal(true)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              p: 0,
              minWidth: 0,
              border: 0,
              '&:hover': { backgroundColor: 'inherit', border: 0 },
            }}
          >
            <HelpIcon theme={theme}>
              <use href={`${SPRITE}${needHelpSvg}`} xlinkHref={`${SPRITE}${needHelpSvg}`} />
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
          </Button>

          <MainModal modalIsOpen={openHelpModal} closeModal={closeHelp}>
            <NeedHelpModal closeModal={closeHelp} />
          </MainModal>
        </NeedHelpBox>

        <Box
          sx={{
            mt: '24px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: 0.7,
          }}
        >
          <Button
            type="button"
            onClick={handleLogout}
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
               <use href={`${SPRITE}${logOutSvg}`} xlinkHref={`${SPRITE}${logOutSvg}`} />
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
        </Box>
      </Thumb>
    </SideBarStyled>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Mobil/Tablet: gecici drawer */}
        <Drawer
          variant="temporary"
          open={active}
          onClose={onClick}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 225 },
            '@media (min-width: 768px)': {
              '& .MuiDrawer-paper': { width: 260 },
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop: kalici drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 225 },
            '@media (min-width: 768px)': {
              '& .MuiDrawer-paper': { width: 260 },
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        <MainModal modalIsOpen={openAddModal} closeModal={closeAdd}>
          <NewBoardForm
            formTitle={'New board'}
            btnText={'Create'}
            handleSubmit={handleSubmit}
            closeModal={closeAdd}
          />
        </MainModal>

        <MainModal modalIsOpen={openEditModal} closeModal={closeEdit}>
          <NewBoardForm
            formTitle={'Edit board'}
            btnText={'Edit'}
            handleSubmit={handleSubmit}
            boardTitle={activeBoardTitle}
            boardIcon={activeBoardIcon}
            closeModal={closeEdit}
          />
        </MainModal>
      </Box>
    </>
  );
};

export default SideBar;
