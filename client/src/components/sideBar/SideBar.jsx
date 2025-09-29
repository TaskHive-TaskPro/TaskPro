
import CssBaseline from '@mui/material/CssBaseline';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import icons from '../../images/icons.svg';
import NewBoardForm from '../forms/newBoardForm/NewBoardForm';
import MainModal from '../mainModal/MainModal';
import NeedHelpModal from '../forms/needHelpModal/NeedHelpModal';
import { Box, Button, Typography, Drawer, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useTheme } from '@mui/material';
import { selectUser } from '../../redux/auth/authSelectors';
import { useGetBoardsQuery } from '../../redux/boards/boardsApi';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import {
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../../redux/boards/boardsApi'; // ← alias yerine relative

const SideBar = ({ active, onClick }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [activeBoardTitle, setActiveBoardTitle] = useState('');
  const [activeBoardIcon, setActiveBoardIcon] = useState('');
  const { data = [] } = useGetBoardsQuery();

  const location = useLocation();
  const { boardId } = useParams();

  const [addBoard] = useAddBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setOpenHelpModal(true);
  const closeModal = () => setOpenHelpModal(false);

  const openEditModalHandler = (boardTitle, boardIcon) => {
    setActiveBoardTitle(boardTitle);
    setActiveBoardIcon(boardIcon);
    setOpenEditModal(true);
  };

  const closeAddModal = () => setOpenAddModal(false);
  const closeEditModal = () => setOpenEditModal(false);
  const closeHelpModal = () => setOpenHelpModal(false);

  const handleSubmit = async (formData, formTitle) => {
    const currentBoardId = boardId;

    if (formTitle === 'New board') {
      try {
        const res = await addBoard({ data: formData }).unwrap();
        closeAddModal();
        navigate(`/home/${res._id}`);
      } catch (e) {
        // TODO: toast/snackbar ile hata bildir
      }
      return;
    }

    if (formTitle === 'Edit board') {
      updateBoard({ boardId: currentBoardId, data: formData });
      closeEditModal();
      return;
    }
  };

  const deleteBoardHandler = (id) => {
    deleteBoard({ boardId: id });
    navigate('/home');
  };

  const theme = useTheme();
  const user = useSelector(selectUser) || { theme: 'light' };


  const logoSvg = user.theme === 'violet' ? '#icon-logo-violet' : '#icon-icon-1';
  const needHelpSvg =
    user.theme === 'violet' || user.theme === 'dark'
      ? '#icon-help-white'
      : '#icon-help';
  const logOutSvg =
    user.theme === 'dark' || user.theme === 'light'
      ? '#icon-login-green'
      : '#icon-login-white';

  const drawerContent = (
    <SideBarStyled
      sx={{
        bgcolor: 'background.default',
        // İstersen bu iki satırı kaldır: scrollbar'ı BoardsList içinde yönetiyoruz
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
            <use href={icons + `${logoSvg}`}></use>
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
          <Button
            onClick={() => setOpenAddModal(true)}
            sx={{
              backgroundColor: 'secondary.warning',
              padding: '8px 10px',
              minWidth: 0,
              transition: 'background-color 200ms linear',
              '&:hover': { backgroundColor: 'text.error' },
            }}
          >
            <PlusIcon theme={theme}>
              <use href={icons + '#icon-plus-2'}></use>
            </PlusIcon>
          </Button>
        </Box>

        <BoardsContainer>
          <BoardsList theme={theme}>
            {data &&
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
                          <use href={icons + board.icon}></use>
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
                            <use href={icons + '#icon-pencil-01'}></use>
                          </Edit>
                        </IconButton>
                        <IconLink
                          aria-label="Delete board"
                          onClick={() => deleteBoardHandler(board._id)}
                        >
                          <Delete>
                            <use href={icons + '#icon-trash-04'}></use>
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
                onClick={openModal}
              >
                {' '}
                TaskPro
              </Link>
              , check out our support resources or reach out to our customer
              support team.
            </Typography>
          </Box>

          <Button
            onClick={() => setOpenHelpModal(true)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: 0,
              minWidth: 0,
              border: 0,
              '&:hover': { backgroundColor: 'inherit', border: 0 },
            }}
          >
            <HelpIcon theme={theme}>
              <use href={icons + `${needHelpSvg}`}></use>
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

          <MainModal modalIsOpen={openHelpModal} closeModal={closeModal}>
            <NeedHelpModal closeModal={closeModal} />
          </MainModal>
        </NeedHelpBox>

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
            onClick={() => dispatch(logOut())}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: 0,
              minWidth: 0,
              border: 0,
              '&:hover': { backgroundColor: 'inherit', border: 0 },
            }}
          >
            <LogoutIcon>
              <use href={icons + `${logOutSvg}`}></use>
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
      </Box>
    </>
  );
};

export default SideBar;
