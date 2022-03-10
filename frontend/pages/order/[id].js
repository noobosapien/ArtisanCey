import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShowBaggedItems from '../../components/Checkout/ShowBaggedItems';
import { Box } from '@mui/system';
import Tick from '../../public/correct.svg';
import Image from 'next/image';
import { getOrder } from '../../helpers/getOrder';
import StatusStepper from '../../components/Order/StatusStepper';

function Order({ params, query }) {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [name, setName] = useState('');

  useEffect(() => {
    const getOrderFromServer = async () => {
      const result = await getOrder(params.id, query.auth);

      if (result && result.shippingInfo) {
        setOrder(result);

        var sInfo = '';
        if (result.shippingInfo.firstName) {
          sInfo = result.shippingInfo;
        } else {
          sInfo = JSON.parse(result.shippingInfo);
        }
        setName(`${sInfo.firstName} ${sInfo.lastName}`);
      } else {
        router.push('/bag');
      }
    };

    getOrderFromServer();
  }, [params]);

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="space-evenly"
        direction="column"
        spacing={4}
      >
        <Grid item>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <ShowBaggedItems order={params.id} />
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Divider />
          </Box>
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Grid item>
            <Typography variant="h3">Thank you {name}</Typography>
          </Grid>

          <Grid item>
            <Image src={Tick.src} width={200} height={200} alt="all done" />
          </Grid>

          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Typography
                align="center"
                variant="h6"
                sx={{ fontSize: '0.8rem' }}
              >
                We recieved your order and now processing it!
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                variant="h6"
                sx={{ fontSize: '0.8rem' }}
              >
                We will update this page when there is a change in your shipment
                status.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                variant="h6"
                sx={{ fontSize: '0.8rem' }}
              >
                Do not hesitate to contact us if there is any issue
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h3">Current status</Typography>
          </Grid>

          <Grid item>
            <StatusStepper order={order} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params, query }) {
  return { props: { params, query } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
