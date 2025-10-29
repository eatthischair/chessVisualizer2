import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GhostButton } from '../../components/ui/GhostButton';

const ImportGame = ({ pgnInput, readPgn, pgnValid, currentPgn }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <GhostButton className={'!justify-center'}>Import Game</GhostButton>
        </DialogTrigger>
        <DialogContent className="!bg-transparent backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Import Game</DialogTitle>
            <DialogDescription>
              Import one of your own games, or from a database
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="pgn-1">Pgn Text</Label>
              <div>
                {!pgnValid || pgnValid === undefined ? (
                  <div className="text-red-600 text-sm">Cannot parse PGN</div>
                ) : (
                  ''
                )}
              </div>
              <Textarea
                id="pgn-1"
                name="username"
                placeholder="e4 e5 Nf3..."
                onChange={e => pgnInput(e)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => readPgn(currentPgn)}
              className="!bg-transparent backdrop-blur"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ImportGame;
