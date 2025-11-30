import { Box } from "@radix-ui/themes";
import { Skeleton } from '@/app/components';

const loading = () => {
    return(
        <div>
            <Box className="max-w-xl">
                <Skeleton />
                <Skeleton height="20rem"/>
            </Box>
        </div>
    )
}
export default loading;